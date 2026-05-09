import { Router } from "express";
import authRoutes from "@/routes/auth.routes";
import blogRoutes from "@/routes/blog.routes";
import knowledgeBaseRoutes from "@/routes/knowledgebase.routes";
import aiRoutes from "@/routes/ai.routes";

const router = Router();

// Auth Routes
router.use("/auth", authRoutes);
// Blog Routes
router.use("/blog", blogRoutes);
// Knowledge Base Routes
router.use("/knowledgebase", knowledgeBaseRoutes);
// AI Routes
router.use("/ai", aiRoutes);

export default router;