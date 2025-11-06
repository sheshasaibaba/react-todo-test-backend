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
  body('taskName')
    .trim()
    .notEmpty()
    .withMessage('Task name is required')
    .isLength({ max: 200 })
    .withMessage('Task name cannot exceed 200 characters'),
];

const updateTodoValidation = [
  body('taskName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Task name cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Task name cannot exceed 200 characters'),
  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be an integer between 0 and 100'),
  body('importance')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Importance must be an integer between 1 and 10'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  body('location')
    .optional()
    .trim()
    .isString()
    .withMessage('Location must be a string'),
  body('assignedTo')
    .optional()
    .trim()
    .isString()
    .withMessage('AssignedTo must be a string'),
  body('coordinateWith')
    .optional()
    .trim()
    .isString()
    .withMessage('CoordinateWith must be a string'),
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

