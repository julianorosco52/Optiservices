import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Abierto", "En curso", "Cerrado"],
      default: "Abierto",
      index: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true
    }
  },
  { timestamps: true }
);

TicketSchema.index({ createdAt: -1 });

export default mongoose.model("Ticket", TicketSchema);
