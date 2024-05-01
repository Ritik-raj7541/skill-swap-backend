const asyncHandler = require('express-async-handler') ;
const Skill = require('../models/skills') ;
const Graph = require('../models/graph') ;
const addEdge = require('./edgeAdd');

const findEdge = asyncHandler( async(user) =>{
      const skillNeed = user.skillNeed ;
      const skillServes = user.skillServes ;
      const id = user.id ;

      //edge for need +1 then find for serve type with levels 
      for(let i=0;i<skillNeed.length; ++i){
            const skill = skillNeed[i].skill ;
            const level = skillNeed[i].level ;
            const matchedSkill = await Skill.find({'skill.name': skill}) ;
            const skilledUser = matchedSkill.levels ;
            for(let j=0;j<skilledUser.length; ++j){
                  const userLevel = skilledUser[i].level ;
                  const userId = skilledUser[i].id ;
                  const userSkillType = skilledUser[i].skillType ;
                  if(userSkillType === 'serve' && userLevel > level){
                        // teacherId: userId, studentId: id, skill
                        const newEdge = await addEdge(userId, id, skill) ;
                        if(!newEdge){
                              return false ;
                        }
                  }
            }
      }
      //edge for serve -1 then find for need type with levels 
      for(let i=0;i<skillServes.length; ++i){
            const skill = skillServes[i].skill ;
            const level = skillServes[i].level ;
            const matchedSkill = await Skill.find({'skill.name': skill}) ;
            const skilledUser = matchedSkill.levels ;
            for(let j=0;j<skilledUser.length; ++j){
                  const userLevel = skilledUser[i].level ;
                  const userId = skilledUser[i].id ;
                  const userSkillType = skilledUser[i].skillType ;
                  if(userSkillType === 'need' && userLevel < level){
                        // teacherId: id, studentId: userId, skill
                        const newEdge = await addEdge(id, userId, skill) ;
                        if(!newEdge){
                              return false ;
                        }
                  }
            }
      }
}) ;

module.exports = findEdge ;