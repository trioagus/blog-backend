import express from "express";
import { ArticleController } from "../controller/article.controller";
import { uploadPhoto } from "../lib/upload";
import { validateToken } from "../middleware/auth.validate";
import { isAdmin } from "../middleware/isAdmin.validate";

const router = express.Router();

router.get("/", ArticleController.getArticles);
router.get("/:id", ArticleController.getArticleById);
router.post("/", validateToken, isAdmin, uploadPhoto, ArticleController.createArticle);
router.put("/:id", validateToken, isAdmin, uploadPhoto, ArticleController.updateArticle);
router.delete("/:id", validateToken, isAdmin, ArticleController.deleteArticle);
router.delete("/", validateToken, isAdmin, ArticleController.deleteAllArticles);
router.delete("/title", validateToken, isAdmin, ArticleController.deleteArticleByTitle);

export default router