import express from "express";
import { signup, login } from "../controllers/authControllers.js";
import {
  signupValidation,
  loginValidation,
} from "../middleware/validators/authValidators.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

router.post("/signup", signupValidation, handleValidationErrors, signup);

router.post("/login", loginValidation, handleValidationErrors, login);

export default router;
