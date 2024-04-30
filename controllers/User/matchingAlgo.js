const asyncHandler = require('express-async-handler') ;
const User = require('../../models/user') ;
const Skills = require('../../models/skills') ;
const skillFilter = require('../../middleware/skillFilter');

// 1. profile completion
// METHOD- POST
// API- http://localhost:5000/api/matchingAlgo/user/match/:id

const matching = asyncHandler( async(req, res)=>{
      const id = req.params.id ;
      const user = await User.findById(id) ;
      if(!user){
            res.status(400) ;
            throw new Error("Not a valid user!!");
      }
      //matching for need
      const skillNeed = user.skillNeed[0].skill ;
      const skillNeedLevel = user.skillNeed[0].level ;
      const skill = await Skills.findOne({'skill.name':skillNeed}) ;
      if(!skill){
            res.status(400) ;
            throw new Error("Currently no suck skill is provided by some instructor!!") ;
      }
      //finding who are serving the higher level of skill
      // const skillServeArray = await skillFilter(skill.skill.levels, skillLevel, id, "serve") ;
    

      //matching for serve
      // const skillServe = user.skillServes[0].skill ;
      // const skillLevel2 = user.skillServes[0].level ;
      // const skill2 = await Skills.findOne({'skill.name':skillServe}) ;
      // if(!skill2){
      //       res.status(400) ;
      //       throw new Error("Currently no suck skill is provided by some instructor!!") ;
      // }
      // //finding who are needs my level with less level
      // const skillNeedArray = await skillFilter(skill2.skill.levels, skillLevel2, id, "need") ;
      
      // //answer by combining both
      // console.log(skillServeArray);
      // console.log(skillNeedArray);
      let maxLevel = -1 ;
      let bestUser = {} ;
      let alternateUsers = [] ;
      for(let i=0;i<user.skillServes.length;++i){
            const skillServe = user.skillServes[i].skill ;
            const skillServeLevel = user.skillServes[i].level ;
            const tempUser = await skillFilter(skillServe, skillServeLevel, skillNeed, skillNeedLevel, id) ;
            console.log(tempUser);
            if(tempUser.length > 0 && maxLevel < tempUser[0].level){
                  maxLevel = tempUser[0].level ;
                  if(bestUser != null){
                        alternateUsers.push(...bestUser) ;
                  }
                  bestUser = tempUser[0] ;
            }
            if(tempUser.length > 0){
                  alternateUsers.push(...tempUser.slice(1)) ;
            }
      }
      // const bestFit = 
      // const bestEducator = 
      // const bestStudent = 
      res.status(200).json({"best": bestUser,"alternate": alternateUsers}) ;
}) ;

module.exports = {matching} ;