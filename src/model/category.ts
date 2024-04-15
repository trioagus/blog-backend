import { db } from "../config/database";
import { validateCategoryInput } from "../security/categoryValidation";
import { sanitizeInput } from "../security/sanitize";
import { v4 as uuidv4 } from "uuid";

export class Category {
  static async createCategoryTable(): Promise<void> {
    try {
      await (
        await db
      ).query(`
        CREATE TABLE IF NOT EXISTS category (
          id VARCHAR(36) PRIMARY KEY, 
          name VARCHAR(255)
        )
      `);
      console.log("Table 'category' created or already exists.");
    } catch (error) {
      console.error("Error creating 'category' table:", error);
    }
  }

  static async createCategory(name: string): Promise<any> {
    validateCategoryInput(name);
    name = sanitizeInput(name);
    const id = uuidv4();
    try {
      const [rows] = await (
        await db
      ).query("INSERT INTO category (id, name) VALUES (?, ?)", [id, name]);
      return rows;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  static async getCategoryById(id: string): Promise<any> {
    try {
      const [rows] = await (
        await db
      ).query("SELECT * FROM category WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      console.error("Error getting category by ID:", error);
      throw error;
    }
  }

  static async getCategories(): Promise<any> {
    try {
      const [rows] = await (await db).query("SELECT * FROM category");
      return rows;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }

  static async updateCategoryInDatabase(
    id: string,
    name: string
  ): Promise<any> {
    try {
      const updatedCategory = await (
        await db
      ).query("UPDATE category SET name = ? WHERE id = ?", [name, id]);
      return updatedCategory;
    } catch (error) {
      console.error("Error updating category in database:", error);
      throw error;
    }
  }

  static async deleteCategory(id: string): Promise<any> {
    try {
      const [rows] = await (
        await db
      ).query("DELETE FROM category WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}

Category.createCategoryTable();
