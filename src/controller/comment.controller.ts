import { CommentService } from "../service/comment.service";
import { Request, Response } from "express";

export class CommentController {
  static async getComments(req: Request, res: Response): Promise<void> {
    try {
      const comments = await CommentService.getComments();
      res.status(200).json({
        code: 200,
        message: "Success",
        data: comments,
      });
    } catch (error) {
      console.error("Get Comments Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getCommentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const comment = await CommentService.getCommentById(id);
      res.status(200).json({
        code: 200,
        message: "Success",
        data: comment,
      });
    } catch (error) {
      console.error("Get Comment Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getCommentsByArticleId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { articleId } = req.params;
      const comments = await CommentService.getCommentsByArticleId(articleId);
      res.status(200).json({
        code: 200,
        message: "Success",
        data: comments,
      });
    } catch (error) {
      console.error("Get Comments by Article ID Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async createComment(req: Request, res: Response): Promise<void> {
    try {
      const { content, userId, articleId } = req.body;
      const createdComment = await CommentService.createComment(
        content,
        userId,
        articleId
      );
      res.status(201).json({
        code: 201,
        message: "Comment created successfully",
        data: createdComment,
      });
    } catch (error) {
      console.error("Create Comment Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async updateComment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { content, userId, articleId } = req.body;
      const updatedComment = await CommentService.updateComment(
        id,
        content,
        userId,
        articleId
      );
      res.status(200).json({
        code: 200,
        message: "Comment updated successfully",
        data: updatedComment,
      });
    } catch (error) {
      console.error("Update Comment Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedComment = await CommentService.deleteComment(id);
      res.status(200).json({
        code: 200,
        message: "Comment deleted successfully",
        data: deletedComment,
      });
    } catch (error) {
      console.error("Delete Comment Error:", error);
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}
