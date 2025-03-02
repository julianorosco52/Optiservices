const Ticket = require("../models/Ticket");

export async function getTickets(req, res) {
  const tickets =
    req.user.role === "admin"
      ? await Ticket.find()
      : await Ticket.find({ userId: req.user.id });
  res.json(tickets);
  console.log("Tickets fetched");
}

export async function createTicket(req, res) {
  const { title, description } = req.body;
  const ticket = new Ticket({ userId: req.user.id, title, description });
  await ticket.save();
  res.status(201).json(ticket);
  console.log("Ticket created");
}

export async function updateTicket(req, res) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(ticket);
  console.log("Ticket updated");
}
