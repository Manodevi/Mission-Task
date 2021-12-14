const express = require('express');
const router = express.Router();
const Task = require('../model/Task');

// @route   GET api/tasks
// @desc    Get Tasks
// @access  Public
router.get(
  '/',
  async (req, res) => {
    try {
      console.log('get all tasks');
      // get all tasks
      const tasks = await Task.find({}).sort({_id: 1});
      res.json(tasks);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
