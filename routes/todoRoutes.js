const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  toggleComplete,
  deleteTodo,
} = require('../controllers/todoController');
const { protect } = require('../middleware/auth');
const handleValidationErrors = require('../middleware/validation');

// Validation rules
const todoValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
];

const updateTodoValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
];

// All routes require authentication
router.use(protect);

router.route('/').get(getTodos).post(todoValidation, handleValidationErrors, createTodo);

router
  .route('/:id')
  .get(getTodo)
  .put(updateTodoValidation, handleValidationErrors, updateTodo)
  .delete(deleteTodo);

router.patch('/:id/complete', toggleComplete);

module.exports = router;

