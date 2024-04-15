import { Request, Response } from "express";
import { CategoryService } from "../service/category.service";

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const category = await CategoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    const categoryId = req.params.id;
    try {
      const category = await CategoryService.getCategoryById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getCategories();
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    const id = req.params.id;
    const { name } = req.body;
  
    try {
      const updatedCategory = await CategoryService.updateCategory(id, name); 
      res.status(200).json(updatedCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  
  static async deleteCategory(req: Request, res: Response) {
    const categoryId = req.params.id;
    try {
      await CategoryService.deleteCategory(categoryId);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
