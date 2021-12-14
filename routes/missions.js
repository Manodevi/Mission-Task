const express = require('express');
const router = express.Router();
const Mission = require('../model/Mission');

// @route   POST api/missions
// @desc    Add a Mission
// @access  Public
router.post('/', async (req, res) => {
  console.log('Mission entered');
  const { tasks } = req.body; 
  
  try {
    let mission = new Mission({ tasks });
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
      console.log('get all missions');
      // get all missions
      const missions = await Mission.find({}).sort({_id: -1});
      res.json(missions);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/missions/:id
// @desc    Get Single Mission
// @access  Public
router.get(
  '/:id',
  async (req, res) => {
    try {
      console.log('get single mission');
      // get single mission
      const mission = await Mission.findById(req.params.id).sort({mission: 1});

      if(!mission) return res.status(404).json({msg: "Mission not found"});
      
      res.json(mission);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/missions/:id
// @desc    Update Mission
// @access  Public
router.put(
  '/:id',
  async (req, res) => {
    try {
      console.log('Update Mission');
      const { tasks } = req.body;

      // Build Mission object
      const missionFields = {};      
      if(tasks) missionFields.tasks = tasks;      

      let mission = await Mission.findById(req.params.id);

      if(!mission) return res.status(404).json({ msg: "Mission not found" });

      mission = await Mission.findByIdAndUpdate(req.params.id, 
          missionFields, {new: true});
      res.json(mission);

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/missions/:id
// @desc    Delete a mission details
// @access  Public
router.delete(
  '/:id',
  async (req, res) => {
    try {      
      const mission = await Mission.findById(req.params.id);
      if(!mission) return res.status(404).json({ msg: "Mission not found" });
      
      await Mission.findByIdAndDelete(req.params.id);
      
      res.json({msg: "Mission Details Deleted"});
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
