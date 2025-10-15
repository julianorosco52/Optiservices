import Ticket from "../models/Ticket.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export async function getTickets (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { status, search } = req.query;

    const query = req.user.role === "admin" ? {} : { userId: req.user.id };

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const ticketsQuery = Ticket.find(query)
      .populate("assignedTo", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const tickets = await ticketsQuery;
    const totalTickets = await Ticket.countDocuments(query);

    res.json({
      tickets, //
      totalPages: Math.ceil(totalTickets / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getTicketById (req, res) {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "assignedTo",
      "username"
    );
    const comments = await Comment.find({ ticketId: req.params.id })
      .populate("userId", "username")
      .sort({ createdAt: 1 });
    res.json({ ticket, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error de servidor" });
  }
}

export async function createTicket (req, res) {
  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ userId: req.user.id, title, description });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error de servidor" });
  }
}

export async function updateTicket (req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Prohibido" });
    }

    const { status } = req.body;
    if (!["Abierto", "En curso", "Cerrado"].includes(status)) {
      return res.status(400).json({ message: "Ticket no encontrado" });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    req.io.emit("ticket:updated", ticket);
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error de servidor" });
  }
}

export async function deleteTicket (req, res) {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    if (ticket.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "No autorizado: Solo puedes eliminar tus propios tickets"
      });
    }

    await Ticket.findByIdAndDelete(req.params.id);
    req.io.emit("ticket:deleted", req.params.id);
    res.json({ message: "Ticket eliminado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error de servidor" });
  }
}

export async function assignTicket (req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Prohibido" });
    }

    const { adminId } = req.body;

    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(400).json({ message: "ID de administrador no válido" });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo: adminId },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    req.io.emit("ticket:assigned", ticket);
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error de servidor" });
  }
}

export async function addComment (req, res) {
  try {
    const { text } = req.body;
    const comment = new Comment({
      ticketId: req.params.id,
      userId: req.user.id,
      text
    });
    await comment.save();
    const populatedComment = await Comment.findById(comment._id).populate(
      "userId",
      "username"
    );
    req.io.emit("comment:new", populatedComment);
    res.status(201).json(populatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error de servidor" });
  }
}
