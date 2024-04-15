import { db } from "../config/database";
import { validateCommentInput } from "../security/commentValidation";
import { sanitizeInput } from "../security/sanitize";
import { v4 as uuidv4 } from "uuid";

export class Comment {
  static async createCommentTable(): Promise<void> {
    try {
      await (
        await db
      ).query(`
      CREATE TABLE IF NOT EXISTS comment (
        id VARCHAR(36) PRIMARY KEY, 
        content TEXT,
        user_id VARCHAR(36),
        article_id VARCHAR(36),
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (article_id) REFERENCES article(id)
      )
      `);
      console.log("Table 'comment' created or already exists.");
    } catch (error) {
      console.error("Error creating 'comment' table:", error);
    }
  }

  static async createComment(
    content: string,
    userId: string,
    articleId: string
  ): Promise<any> {
    validateCommentInput(content, userId, articleId);
    content = sanitizeInput(content);
    const id = uuidv4();
    try {
      const [rows] = await (
        await db
      ).query(
        "INSERT INTO comment (id, content, user_id, article_id) VALUES (?, ?, ?, ?)",
        [id, content, userId, articleId]
      );
      return rows;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }

  static async getComments(): Promise<any> {
    try {
      const [rows] = await (await db).query("SELECT * FROM comment");
      return rows;
    } catch (error) {
      console.error("Error getting comments:", error);
      throw error;
    }
  }

  static async getCommentById(id: string): Promise<any> {
    try {
      const [rows] = await (
        await db
      ).query("SELECT * FROM comment WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      console.error("Error getting comment by ID:", error);
      throw error;
    }
  }

  static async getCommentsByArticleId(articleId: string): Promise<any> {
    try {
      const [rows] = await (
        await db
      ).query("SELECT * FROM comment WHERE article_id = ?", [articleId]);
      return rows;
    } catch (error) {
      console.error("Error getting comments by article ID:", error);
      throw error;
    }
  }

  static async updateComment(
    id: string,
    content: string,
    userId: string,
    articleId: string
  ): Promise<any> {
    validateCommentInput(content, userId, articleId);
    content = sanitizeInput(content);
    try {
      const [rows] = await (
        await db
      ).query("UPDATE comment SET content = ? WHERE id = ?", [content, id]);
      return rows;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  }

  static async deleteComment(id: string): Promise<void> {
    try {
      const [result] = await (await db).query("DELETE FROM comment WHERE id = ?", [id]);
      if ((result as any).affectedRows === 0) {
        throw new Error("Comment not found");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }
  
  
}

Comment.createCommentTable();
