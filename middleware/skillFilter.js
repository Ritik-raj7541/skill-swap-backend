const asyncHandler = require('express-async-handler') ;
const Skills = require('../models/skills') ;
const User = require('../models/user') ;

const skillFilter = asyncHandler(async(skillServe, skillServeLevel, skillNeed, skillNeedLevel, id)=>{
      const skillDocs = await Skills.findOne({'skill.name': skillServe}) ;
      const skillLearn = skillDocs.skill.levels ;
      
      //sorted increasing wise for binary search
      skillLearn.sort((a, b) => parseFloat(a.level) - parseFloat(b.level)) ;
      let l = 0, h = skillLearn.length-1 ;
      while(h-l > 1){
            let mid = l + Math.trunc((h-l)/2) ;
            console.log(mid);
            if(skillLearn[mid].level < skillServeLevel){
                  l = mid ;
            }
            else{
                  h = mid-1 ;
            }
      }
      // console.log(skillLearn[h]);
      let upto = -1 ;
      if(skillLearn[h].level < skillServeLevel){
            upto = h ;
      }
      else if(skillLearn[l].level < skillServeLevel){
            upto = l ;
      }
      let maxLevel = -1 ;
      // console.log(upto , "--- ",skillLearn);
      for(let i = 0; i <= upto; ++i){
            if(skillLearn[i].skillType === 'serve'){ 
                  continue ;
            }
            const choosenLevel = skillLearn[i] ;
            const user = await User.findById(choosenLevel.id) ;
            const userServeSkill = user.skillServes ;
            if(user.id === id) {
                  continue ;
            }
            for(let j=0; j<userServeSkill.length; ++j){
                  if(userServeSkill[j].skill === skillNeed && userServeSkill[j].level > skillNeedLevel ){
                        if(maxLevel < userServeSkill[j].level){
                              maxLevel = userServeSkill[j].level ;
                        }    
                  }
            }
      }
      const userDetails = [] ;
      for(let i=0;i<= upto; ++i){
            if(skillLearn[i].skillType === 'serve'){ 
                  continue ;
            }
            const choosenLevel = skillLearn[i] ;
            const user = await User.findById(choosenLevel.id) ;
            const userServeSkill = user.skillServes ;
            if(user.id === id) {
                  continue ;
            }
            for(let j=0; j<userServeSkill.length; ++j){
                  if(userServeSkill[j].skill === skillNeed && userServeSkill[j].level === maxLevel){
                        userDetails.push({id: user.id, level: maxLevel}) ;
                  }
            }
      }
      // const skill = [] ;
      // for(let i=0;i<levels.length; ++i){
      //       //check for two conditions : 
      //       const currentDocs = levels[i] ;
      //       // console.log(currentDocs, userSkillLevel, type, id);
      //       if(id === currentDocs.id){
      //             continue ;
      //       }
      //       if(type === "serve" && currentDocs.skillType === type && userSkillLevel < currentDocs.level){
      //             skill.push(currentDocs) ;
      //       }
      //       else if(type === "need" && currentDocs.skillType === type && userSkillLevel > currentDocs.level){
      //             skill.push(currentDocs) ;
      //       }
      // }
      // if(type === 'serve'){
      //       //descending
      //       skill.sort((a, b)=> parseFloat(b.level) - parseFloat(a.level)) ;
      // }else{
      //       //ascending
      //       skill.sort((a, b)=> parseFloat(a.level) - parseFloat(b.level)) ;
      // }
      // console.log(userDetails);
      return userDetails ;
}) ;

module.exports = skillFilter ;