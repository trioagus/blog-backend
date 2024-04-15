import { Comment } from "../model/comment";

export class CommentService {
  static async getComments(): Promise<any[]> {
    try {
      const comments = await Comment.getComments();
      return comments;
    } catch (error: any) {
      throw new Error(`Error getting comments: ${error.message}`);
    }
  }

  static async getCommentById(id: string): Promise<any> {
    try {
      const comment = await Comment.getCommentById(id);
      return comment;
    } catch (error: any) {
      throw new Error(`Error getting comment by ID: ${error.message}`);
    }
  }

  static async getCommentsByArticleId(articleId: string): Promise<any> {
    try {
      const comments = await Comment.getCommentsByArticleId(articleId);
      return comments;
    } catch (error: any) {
      throw new Error(`Error getting comments by article ID: ${error.message}`);
    }
  }

  static async createComment(
    content: string,
    userId: string,
    articleId: string
  ): Promise<any> {
    try {
      const createdComment = await Comment.createComment(
        content,
        userId,
        articleId
      );
      return createdComment;
    } catch (error: any) {
      throw new Error(`Error creating comment: ${error.message}`);
    }
  }

  static async updateComment(
    id: string,
    content: string,
    userId: string,
    articleId: string
  ): Promise<any> {
    try {
      const updatedComment = await Comment.updateComment(
        id,
        content,
        userId,
        articleId
      );
      return updatedComment;
    } catch (error: any) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  }

  static async deleteComment(id: string): Promise<void> {
    try {
      await Comment.deleteComment(id);
    } catch (error) {
      console.error("Delete Comment Error:", error);
      throw error;
    }
  }
  
  
}
