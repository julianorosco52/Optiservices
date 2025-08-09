import { body } from "express-validator";

export const createTicketValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required")
];

export const updateTicketValidation = [
  body("status").isIn(["Open", "In Progress", "Closed"]).withMessage("Invalid status")
];

export const addCommentValidation = [
  body("text").notEmpty().withMessage("Comment text is required")
];
