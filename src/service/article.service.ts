import { Article } from "../model/article";
import fs from "fs";

const IMAGE_BASE_URL = "http://localhost:3003/uploads/";

export class ArticleService {
  static async getArticles(): Promise<any[]> {
    try {
      const articles = await Article.getArticles();
      return articles.map((article: any) => ({
        article_id: article.article_id,
        article_title: article.article_title,
        article_content: article.article_content,
        article_image: article.article_image,
        author_name: article.username,
        category_name: article.category_name,
        imageURL: article.article_image
          ? `${IMAGE_BASE_URL}${article.article_image}`
          : null,
      }));
    } catch (error: any) {
      throw new Error(`Error getting articles: ${error.message}`);
    }
  }

  static async getArticleById(id: string): Promise<any> {
    try {
      const article = await Article.getArticleById(id);
      if (!article || article.length === 0) {
        return { code: 404, message: "Article not found" };
      }
      const transformedArticle = {
        article_id: article[0].article_id,
        article_title: article[0].article_title,
        article_content: article[0].article_content,
        article_image: article[0].article_image,
        author_name: article[0].username,
        category_name: article[0].category_name,
        imageURL: article[0].article_image
          ? `${IMAGE_BASE_URL}${article[0].article_image}`
          : null,
      };
      return { code: 200, message: "Success", data: transformedArticle };
    } catch (error: any) {
      throw new Error(`Error getting article by ID: ${error.message}`);
    }
  }

  static async createArticle(
    title: string,
    content: string,
    image: string,
    authorId: string,
    categoryId: string
  ): Promise<any> {
    try {
      const createdArticle = await Article.createArticle(
        title,
        content,
        image,
        authorId,
        categoryId
      );
      return createdArticle;
    } catch (error: any) {
      throw new Error(`Error creating article: ${error.message}`);
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
    try {
      const oldArticle = await Article.getArticleById(id);

      if (!oldArticle || oldArticle.length === 0) {
        throw new Error("Article not found");
      }

      let updatedImage = oldArticle[0]?.article_image;

      if (image) {
        const allowedExtensions = ["jpg", "jpeg", "webp", "png"];
        const extension = image.split(".").pop()?.toLowerCase();
        if (!allowedExtensions.includes(extension as string)) {
          throw new Error("Only JPG, JPEG, WEBP, and PNG images are allowed.");
        }
        updatedImage = image;
      }

      if (updatedImage !== oldArticle[0]?.article_image) {
        const imagePath = `${__dirname}/../../public/uploads/${oldArticle[0]?.article_image}`;
        fs.unlinkSync(imagePath);
      }

      const updatedArticle = await Article.updateArticle(
        id,
        title,
        content,
        updatedImage,
        authorId,
        categoryId
      );
      return updatedArticle;
    } catch (error: any) {
      throw new Error(`Error updating article: ${error.message}`);
    }
  }

  static async deleteArticle(id: string): Promise<void> {
    try {
      const article = await Article.getArticleById(id);
      if (article && article.length > 0 && article[0].article_image) {
        const imagePath = `${__dirname}/../../public/uploads/${article[0].article_image}`;
        fs.unlinkSync(imagePath);
      }
      await Article.deleteArticle(id);
    } catch (error: any) {
      throw new Error(`Error deleting article: ${error.message}`);
    }
  }

  static async deleteAllArticles(): Promise<void> {
    try {
      const articles = await Article.getArticles();
      articles.forEach(async (article : any) => {
        if (article.article_image) {
          const imagePath = `${__dirname}/../../public/uploads/${article.article_image}`;
          fs.unlinkSync(imagePath);
        }
      });
      await Article.deleteAllArticles();
    } catch (error: any) {
      throw new Error(`Error deleting all articles: ${error.message}`);
    }
  }

  static async deleteArticleByTitle(title: string): Promise<void> {
    try {
      const article = await Article.deleteArticleByTitle(title);
      if (article && article.length > 0 && article[0].article_image) {
        const imagePath = `${__dirname}/../../public/uploads/${article[0].article_image}`;
        fs.unlinkSync(imagePath);
      }
      await Article.deleteArticleByTitle(title);
    } catch (error: any) {
      throw new Error(`Error deleting article by title: ${error.message}`);
    }
  }
}
