import { Request, Response } from "express";
import { ArticleService } from "../service/article.service";

export class ArticleController {
  static async getArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await ArticleService.getArticles();
      res.status(200).json({
        code: 200,
        message: "Success",
        data: articles,
      });
    } catch (error) {
      console.error("Get Articles Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getArticleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const article = await ArticleService.getArticleById(id);
      res.status(200).json({
        code: 200,
        message: "Success",
        data: article,
      });
    } catch (error) {
      console.error("Get Article Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, authorId, categoryId } = req.body;
      const image = req.file ? req.file.filename : "";
      const createdArticle = await ArticleService.createArticle(
        title,
        content,
        image,
        authorId,
        categoryId
      );
      res.status(201).json({
        code: 201,
        message: "Article created successfully",
        data: createdArticle,
      });
    } catch (error) {
      console.error("Create Article Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, content, authorId, categoryId } = req.body;
      const image = req.file ? req.file.filename : "";
      const updatedArticle = await ArticleService.updateArticle(
        id,
        title,
        content,
        image,
        authorId,
        categoryId
      );
      res.status(200).json({
        code: 200,
        message: "Article updated successfully",
        data: updatedArticle,
      });
    } catch (error) {
      console.error("Update Article Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async deleteArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ArticleService.deleteArticle(id);
      res.status(200).json({
        code: 200,
        message: "Article deleted successfully",
      });
    } catch (error) {
      console.error("Delete Article Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async deleteAllArticles(req: Request, res: Response): Promise<void> {
    try {
      await ArticleService.deleteAllArticles();
      res.status(200).json({
        code: 200,
        message: "All articles deleted successfully",
      });
    } catch (error) {
      console.error("Delete All Articles Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async deleteArticleByTitle(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.params;
      await ArticleService.deleteArticleByTitle(title);
      res.status(200).json({
        code: 200,
        message: "Article deleted successfully",
      });
    } catch (error) {
      console.error("Delete Article By Title Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}
