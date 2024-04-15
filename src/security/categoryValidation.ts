export function validateCategoryInput(name: string): void {
    if (!name.trim()) {
      throw new Error("Category name is required.");
    }
  }