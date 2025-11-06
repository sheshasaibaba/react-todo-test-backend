const Todo = require('../models/Todo');

// @desc    Get all todos for logged in user
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this todo',
      });
    }

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res, next) => {
  try {
    const { taskName } = req.body;

    // Auto-populate all fields with default values
    const todo = await Todo.create({
      taskName,
      progress: 0,
      importance: 1,
      completed: false,
      location: '',
      assignedTo: '',
      coordinateWith: '',
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this todo',
      });
    }

    // Update the todo with the provided fields
    const updateFields = {};
    if (req.body.taskName !== undefined) updateFields.taskName = req.body.taskName;
    if (req.body.progress !== undefined) updateFields.progress = req.body.progress;
    if (req.body.importance !== undefined) updateFields.importance = req.body.importance;
    if (req.body.completed !== undefined) updateFields.completed = req.body.completed;
    if (req.body.location !== undefined) updateFields.location = req.body.location;
    if (req.body.assignedTo !== undefined) updateFields.assignedTo = req.body.assignedTo;
    if (req.body.coordinateWith !== undefined) updateFields.coordinateWith = req.body.coordinateWith;

    todo = await Todo.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle todo completion status
// @route   PATCH /api/todos/:id/complete
// @access  Private
const toggleComplete = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this todo',
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this todo',
      });
    }

    await todo.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  toggleComplete,
  deleteTodo,
};

