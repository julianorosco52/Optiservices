import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

CommentSchema.index({ createdAt: 1 });

export default mongoose.model("Comment", CommentSchema);
