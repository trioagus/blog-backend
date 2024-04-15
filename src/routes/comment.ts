import express from 'express'
import { CommentController } from '../controller/comment.controller'
import { validateToken } from '../middleware/auth.validate'

const router = express.Router()

router.get('/', CommentController.getComments)
router.get('/:id', CommentController.getCommentById)
router.get('/article/:articleId', CommentController.getCommentsByArticleId)
router.post('/', validateToken, CommentController.createComment)
router.put('/:id', validateToken, CommentController.updateComment)
router.delete('/:id', validateToken, CommentController.deleteComment)

export default router