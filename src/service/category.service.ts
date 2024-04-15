import { Category } from "../model/category";

export class CategoryService {
  static async createCategory(name: string): Promise<any> {
    try {
      const category = await Category.createCategory(name);
      return category;
    } catch (error: any) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  static async getCategoryById(id: string): Promise<any> {
    try {
      const category = await Category.getCategoryById(id);
      return category;
    } catch (error: any) {
      throw new Error(`Error getting category by ID: ${error.message}`);
    }
  }

  static async getCategories(): Promise<any> {
    try {
      const categories = await Category.getCategories();
      return categories;
    } catch (error: any) {
      throw new Error(`Error getting categories: ${error.message}`);
    }
  }

  static async updateCategory(id: string, name: string): Promise<any> {
    try {
      const updatedCategory = await Category.updateCategoryInDatabase(id, name);
      return updatedCategory;
    } catch (error: any) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  static async deleteCategory(id: string): Promise<any> {
    try {
      await Category.deleteCategory(id);
    } catch (error: any) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }
}
