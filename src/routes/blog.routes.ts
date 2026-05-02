import { Router } from "express";
import { AuthMiddleware } from "@/middlewares/auth-middleware";
import { permittedRole } from "@/middlewares/rbac-middleware";
import { Role } from "@/generated/prisma";
import { validateSchema } from "@/middlewares/validate-schema.middleware";
import { createBlogSchema, updateBlogSchema, deleteBlogSchema } from "@/schema/blog";
import { BlogController } from "@/controllers/blog.controller";

const router = Router();
const blogController = new BlogController();
const authMiddleware = new AuthMiddleware();

// Public Routes (No Auth Needed or Role)
router.get("/v1/all-posts", blogController.getAllBlogs);
router.get("/v1/post/:id", blogController.getBlogById);

// Private Routes (Require Authentication & Admin Role)
router.post("/v1/create-post", authMiddleware.execute, permittedRole([Role.ADMIN]), validateSchema(createBlogSchema), blogController.createBlog);
router.post("/v1/update-post", authMiddleware.execute, permittedRole([Role.ADMIN]), validateSchema(updateBlogSchema), blogController.updateBlog);
router.post("/v1/delete-post", authMiddleware.execute, permittedRole([Role.ADMIN]), validateSchema(deleteBlogSchema), blogController.deleteBlog);

export default router;