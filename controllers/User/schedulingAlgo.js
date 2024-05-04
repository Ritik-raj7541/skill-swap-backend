const asyncHandler = require('express-async-handler') ;
const User = require('../../models/user') ;
const Group = require('../../models/studyGroup') ;
const Graph = require('../../models/graph') ;
const Scheduler = require('../../models/schedule') ;
const schedulingAlgo = require('../../middleware/primeScheduler');

const scheduler = asyncHandler( async(req, res) =>{
  const schedule = req.body ;
  const userId = req.body.id ;
  // const groupId = req.params.groupID ;
  const user = await User.findById(userId) ;
  const groupId = user.group[0].id ;
  const newUserSchedule = await Scheduler.findOne({id: userId, groupId: groupId}) ;
  if(newUserSchedule){
    res.status(208).json({message: "already given the schedule wait for others !!"}) ;
  }
  const newSchedule = await Scheduler.create({
    userId: userId,
    groupId: groupId,
    schedule: schedule,
  }) ;
  if(!newSchedule){
    res.status(400)
    throw new Error("schedule not formed !!") ;
  }
  const groupSchedule = await Scheduler.find({groupId: groupId}) ;
  const group = await Group.findById(groupId) ;
  if(groupSchedule.length < group.allIds.length){
    res.status(208).json({message: "your schedule added kindly wait for others !!"}) ;
  }
  let registeringTimes = [] ;
  let links = [] ;
  let userSchedules = []
  for(let i=0;i<groupSchedule.length; ++i){
    userSchedules.push(schedule) ;
  }
  
  for(let i=0;i<group.allIds.length; ++i){
    const pair = group.allIds[i] ;
    const edge = await Graph.find({teacher: pair.id, student: pair.linkedId}) ;
    const user1 = await User.findById(pair.id) ;
    const user2 = await User.findById(pair.linkedId) ;
    links.push({teacher: user1.name, student: user2.name, skill: edge.skill, time: edge.linkTime}) ;
    registeringTimes.push({userId: user1.name, time: user1.time}) ;
  }
  const result = await schedulingAlgo(registeringTimes , links , userSchedules) ;
  res.status(200).json({groupId: groupId, schedules: result}) ;
}) ;

module.exports = scheduler ;