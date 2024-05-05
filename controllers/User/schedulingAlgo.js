const asyncHandler = require("express-async-handler");
const User = require("../../models/user");
const Group = require("../../models/studyGroup");
const Graph = require("../../models/graph");
const Scheduler = require("../../models/schedule");
const { schedulingAlgo } = require("../../middleware/primeScheduler");
const Schedule = require("../../models/userSchedule");

//1. Add schedule
//METHOD - POST
//API- http://localhost:5000/api/schedulingAlgo/user/schedule/:id
const scheduler = asyncHandler(async (req, res) => {
  const schedule = req.body;
  const userId = req.params.id;
  // console.log(schedule);
  // const groupId = req.params.groupID ;
  const user = await User.findById(userId);
  // console.log(user.group);
  const groupId = user.groups[0].id;
  // console.log(groupId);
  const newUserSchedule = await Scheduler.findOne({
    groupId: groupId,
    userId: userId,
  });
  // console.log(newUserSchedule);
  if (newUserSchedule) {
    res.status(400) ;
    throw new Error("Already added") ;
      
  }
  const newSchedule = await Scheduler.create({
    userId: userId,
    groupId: groupId,
    schedule: schedule,
  });
  if (!newSchedule) {
    res.status(400);
    throw new Error("schedule not formed !!");
  }
  const groupSchedule = await Scheduler.find({ groupId: groupId });
  const group = await Group.findById(groupId);
  console.log(typeof groupSchedule.length, typeof group.allIds.length);
  if (groupSchedule.length < group.allIds.length) {
    console.log("ritik");
    res
      .status(400)
      throw new Error("Not filled by all!!") ;
  } 
    let registeringTimes = [];
    let links = [];
    let userSchedules = [];
    for (let i = 0; i < groupSchedule.length; ++i) {
      userSchedules.push(groupSchedule[i].schedule);
    }

    for (let i = 0; i < group.allIds.length; ++i) {
      const pair = group.allIds[i];
      const edge = await Graph.findOne({
        teacher: pair.id,
        student: pair.linkedId,
      });
      // console.log(edge);
      const user1 = await User.findById(pair.id);
      const user2 = await User.findById(pair.linkedId);
      links.push({
        teacher: user1.id,
        student: user2.id,
        skill: edge.skill,
        time: edge.linkTime,
      });
      registeringTimes.push({ userId: user1.id, time: user1.time });
    }
    const result = await schedulingAlgo(registeringTimes, links, userSchedules);
    //add schedule in students schema and send message
    console.log(result);
    const userSchedule = await Schedule.create({
      groupId: groupId,
      schedule: result,
    });
    if (!userSchedule) {
      res.status(400);
      throw new Error("some error occur");
    }
  res.status(200).json({ message: "Final Schedule added in you schedule bar" });
});

//2. Get schedule
//METHOD - GET
//API- http://localhost:5000/api/schedulingAlgo/user/show-schedule/:id
const getSchedule = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId) ;
  const groupId = user.groups[0].id ;
  console.log(groupId);
  const schedule = await Schedule.findOne({groupId: groupId });
  if (!schedule) {
    res.status(400);
    throw new Error("Currently you have no schedule!!");
  }
  res.status(200).json(schedule.schedule);
});

module.exports = { scheduler, getSchedule };
