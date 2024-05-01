const asyncHandler = require('express-async-handler') ;
const Graph = require('../models/graph') ;

const addEdge = asyncHandler( async(teacherId, studentId, skill) =>{
      const currentDate = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
      const edge = {
            teacherId,
            studentId,
            skill,
            currentDate,
      }
      const newEdge = await Graph.create({edge}) ;
      if(!newEdge) return false ;
      return true ;
}) ;

module.exports = addEdge ;