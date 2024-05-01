const asyncHandler = require('express-async-handler') ;
const Graph = require('../models/graph') ;

const addEdge = asyncHandler( async(teacherId, studentId, skill) =>{
      const currentDate = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
      const newEdge = await Graph.create({
            teacher: teacherId,
            student: studentId,
            skill: skill,
            linkTime: currentDate,
      }) ;
      if(!newEdge) return false ;
      return true ;
}) ;

module.exports = addEdge ;