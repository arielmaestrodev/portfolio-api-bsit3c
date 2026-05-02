import { Router } from "express";
import { AuthContoller } from "@/controllers/auth.controller";
import { validateSchema } from "@/middlewares/validate-schema.middleware";
import { signupSchema, verifyEmailSchema, loginSchema } from "@/schema/auth";
import { AuthMiddleware } from "@/middlewares/auth-middleware";
import { permittedRole } from "@/middlewares/rbac-middleware";
import { Role } from "@/generated/prisma";

const router = Router();
const authController = new AuthContoller();
const authMiddleware = new AuthMiddleware();

router.post("/v1/signup", validateSchema(signupSchema), authController.signup);
router.get("/v1/verify-email", validateSchema(verifyEmailSchema), authController.verifyEmail);
router.post("/v1/login", validateSchema(loginSchema), authController.login);


router.get("/v1/profile", authMiddleware.execute, permittedRole([Role.ADMIN]), (req, res) => {
  return res.status(200).json({ code: 200, status: "success", message: "Profile fetched successfully" })
});

export default router;