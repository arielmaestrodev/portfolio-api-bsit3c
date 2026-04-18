import { Router } from "express";
import { AuthContoller } from "@/controllers/auth.controller";
import { validateSchema } from "@/middlewares/validate-schema.middleware";
import { signupSchema, verifyEmailSchema } from "@/schema/auth";

const router = Router();
const authController = new AuthContoller();

router.post("/v1/signup", validateSchema(signupSchema), authController.signup);
router.get("/v1/verify-email", validateSchema(verifyEmailSchema), authController.verifyEmail);

export default router;