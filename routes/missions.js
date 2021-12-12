const express = require('express');
const router = express.Router();
const Mission = require('../model/Mission');

// @route   POST api/missions
// @desc    Add a Mission
// @access  Public
router.post('/', async (req, res) => {
  console.log('Mission entered');
  const { name, tasks } = req.body;

  try {
    let mission = new Mission({ name, tasks });
    await mission.save();

    res.json(mission);
    console.log('Mission Added');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }      
  // res.send('Add a mission');
});

// @route   GET api/missions
// @desc    Get Missions
// @access  Public
router.get(
  '/',
  async (req, res) => {
    try {
      // get all missions
      const missions = await Mission.find({}).sort({_id: -1});
      res.json(missions);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
