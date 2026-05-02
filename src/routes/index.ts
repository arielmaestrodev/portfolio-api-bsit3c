import { Router } from "express";
import authRoutes from "@/routes/auth.routes";
import blogRoutes from "@/routes/blog.routes";

const router = Router();

// Auth Routes
router.use("/auth", authRoutes);
// Blog Routes
router.use("/blog", blogRoutes);

export default router;