import { db } from "../config/database";
import { validateInput } from "../security/validationInput";
import { sanitizeInput } from "../security/sanitize";
import { v4 as uuidv4 } from "uuid";

export class Article {
  static async createArticleTable(): Promise<void> {
    try {
      await (
        await db
      ).query(`
      CREATE TABLE IF NOT EXISTS article (
        id VARCHAR(36) PRIMARY KEY, 
        title VARCHAR(255), 
        content TEXT, 
        image VARCHAR(255), 
        author_id VARCHAR(36),
        category_id VARCHAR(36),
        FOREIGN KEY (author_id) REFERENCES user(id),
        FOREIGN KEY (category_id) REFERENCES category(id)
      )      
      `);
      console.log("Table 'article' created or already exists.");
    } catch (error) {
      console.error("Error creating 'article' table:", error);
    }
  }

  static async getArticles(): Promise<any> {
    try {
      const [rows] = await (
        await db
      ).query(`
        SELECT 
            article.id AS article_id, 
            article.title AS article_title, 
            article.content AS article_content, 
            article.image AS article_image, 
            user.id AS user_id, 
            user.username AS username, 
            category.id AS category_id, 
            category.name AS category_name
           
        FROM 
            article
        LEFT JOIN 
            user ON article.author_id = user.id
        LEFT JOIN 
            category ON article.category_id = category.id
      
      `);
      return rows;
    } catch (error) {
      console.error("Error getting articles:", error);
      throw error;
    }
  }

  static async getArticleById(id: string): Promise<any> {
    try {
      const [rows] = await (
        await db
      ).query(
        `
        SELECT 
            article.id AS article_id, 
            article.title AS article_title, 
            article.content AS article_content, 
            article.image AS article_image, 
            user.id AS user_id, 
            user.username AS username, 
            category.id AS category_id, 
            category.name AS category_name
           
        FROM 
            article
        LEFT JOIN 
            user ON article.author_id = user.id
        LEFT JOIN 
            category ON article.category_id = category.id
        WHERE 
            article.id = ?
        `,
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error getting article by ID:", error);
      throw error;
    }
  }

  static async createArticle(
    title: string,
    content: string,
    image: string | null,
    authorId: string,
    categoryId: string
  ): Promise<any> {
    validateInput(title, content, image || null);
    title = sanitizeInput(title);
    content = sanitizeInput(content);
    image = image ? sanitizeInput(image) : ''; 
    const id = uuidv4();
    try {
      const [rows] = await (
        await db
      ).query(
        "INSERT INTO article (id, title, content, image, author_id, category_id) VALUES (?, ?, ?, ?, ?, ?)",
        [id, title, content, image, authorId, categoryId]
      );
      return rows;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  }

  static async updateArticle(
    id: string,
    title: string,
    content: string,
    image: string,
    authorId: string,
    categoryId: string
  ): Promise<any> {
    validateInput(title, content, image);
    title = sanitizeInput(title);
    content = sanitizeInput(content);
    image = sanitizeInput(image);
    try {
      const [rows] = await (
        await db
      ).query(
        "UPDATE article SET title = ?, content = ?, image = ?, author_id = ?, category_id = ? WHERE id = ?",
        [title, content, image, authorId, categoryId, id]
      );
      return rows;
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  }

  static async deleteArticle(id: string): Promise<any> {
    try {
      const [rows] = await (
        await db
      ).query("DELETE FROM article WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  }

  static async deleteAllArticles(): Promise<any> {
    try {
      const [rows] = await (await db).query("DELETE FROM article");
      return rows;
    } catch (error) {
      console.error("Error deleting all articles:", error);
      throw error;
    }
  }

  static async deleteArticleByTitle(title: string): Promise<any> {
    try {
      const [rows] = await (
        await db
      ).query("DELETE FROM article WHERE title = ?", [title]);
      return rows;
    } catch (error) {
      console.error("Error deleting article by title:", error);
      throw error;
    }
  }
}

Article.createArticleTable();
