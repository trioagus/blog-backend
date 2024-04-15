import express from 'express'
import { CategoryController } from "../controller/category.controller";
import { validateToken } from '../middleware/auth.validate';
import { isAdmin } from '../middleware/isAdmin.validate';

const router = express.Router();

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', validateToken, isAdmin, CategoryController.createCategory);
router.put('/:id', validateToken, isAdmin, CategoryController.updateCategory);
router.delete('/:id', validateToken, isAdmin, CategoryController.deleteCategory);

export default router