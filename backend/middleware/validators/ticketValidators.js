import { body } from "express-validator";

export const createTicketValidation = [
  body("title").notEmpty().withMessage("Se requiere un Titulo"),
  body("description").notEmpty().withMessage("Se requiere una Descripción")
];

export const updateTicketValidation = [
  body("status").isIn(["Abierto", "En curso", "Cerrado"]).withMessage("Estado invalido")
];

export const addCommentValidation = [
  body("text").notEmpty().withMessage("Comment text is required")
];
