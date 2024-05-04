const asyncHandler = require('express-async-handler') ;
const User = require('../../models/user') ;
const Skills = require('../../models/skills') ;
const Group = require('../../models/studyGroup') ;
const skillFilter = require('../../middleware/skillFilter');
const dfsWhichGivesCycle = require('../../graphImplementaion/dfs');


// 1. matching Algo 1-v-1
// METHOD- GET
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
      let alternateUsers = {} ;
      let ids = [] ;
      let names = [] ;
      let result = [] ;
      let skillTobeTaught = ""
      for(let i=0;i<user.skillServes.length;++i){
            const skillServe = user.skillServes[i].skill ;
            const skillServeLevel = user.skillServes[i].level ;
            const tempUser = await skillFilter(skillServe, skillServeLevel, skillNeed, skillNeedLevel, id) ;
            // console.log(tempUser);
            if(tempUser.length > 0 && maxLevel < tempUser[0].level){
                  maxLevel = tempUser[0].level ;

                  const updatedTempUser = {
                        id: id,
                        linkedId: tempUser[0].id
                  }
                  alternateUsers = {
                        id: tempUser[0].id,
                        linkedId: id
                  }
                  bestUser = updatedTempUser ;
                  skillTobeTaught = skillServe ;
            }
      }
      ids.push(bestUser) ;
      ids.push(alternateUsers) ;
      const id2 = alternateUsers.id ;
      const user2 = await User.findById(id2) ;
      const name = user.name ;
      const name2 = user2.name ;
      names.push({teacher: name, student: name2, skill: skillTobeTaught}) ;
      names.push({teacher: name2, student: name, skill: skillNeed}) ;
      const existGroup = await Group.findOne({'allIds': {$all:ids.map(obj => ({ $elemMatch: obj }))}}) ;

      if(!existGroup){
            const newGroup = await Group.create({
                  allIds: ids,
            }) ;
            result.push({id: newGroup.id, group: names}) ;
      }
      else{
            result.push({id: existGroup.id, group: names}) ; 
      }
      
      res.status(200).json(result) ;
}) ;
// 2. profile completion
// METHOD- GET
// API- http://localhost:5000/api/matchingAlgo/user/match/graph/:id
const graphMatchingAlgo = asyncHandler( async(req, res) =>{
      const id = req.params.id ;
      const allCycle = await dfsWhichGivesCycle(id) ;
      const result = [] ;
      for(let i=0;i<allCycle.length; ++i){
            const group = allCycle[i] ;
            // let uniqueId = "" ;
            let ids = [] ;
            let names = [] ;
            
            for(let j=0;j<group.length; ++j){
                  // uniqueId += group[j].teacher ;
                  ids.push({id: group[j].teacher, linkedId: group[j].student}) ;
                  const user1 = await User.findById(group[j].teacher) ;
                  const user2 = await User.findById(group[j].student) ;
                  names.push({teacher: user1.name, student: user2.name, skill: group[j].skill}) ;
            }
            //CHANGE DONE
            const existGroup = await Group.findOne({'allIds': {$all:ids.map(obj => ({ $elemMatch: obj }))}}) ;
            if(!existGroup){
                  const newGroup = await Group.create({
                        // uniqueId: uniqueId,
                        allIds: ids
                  }) ;
                  result.push({id: newGroup.id, group: names}) ;
            }
            else{

            }
            result.push({id: existGroup.id, group: names}) ;
      }
      res.status(200).json(result) ;
}) ;


// 3. conformation check with backtracking
// METHOD- GET
// API- http://localhost:5000/api/matchingAlgo/user/confirmation/:groupId/:id

const confirmation = asyncHandler( async(req, res) =>{
      const userId = req.params.id ;
      const groupId = req.params.groupId ;
      const user = await User.findOne({_id: userId, "groups.id": groupId}) ;
      console.log(user);
      //NEED TO BE UNCOMMENT AFTER THE DATABASE CHANGE ONCE AGAIN
      if(!user){
            const updatedUser = await User.findOneAndUpdate(
                  {_id: userId}, 
                  {$push: {groups: {id:groupId}}}, 
                  {new: true}
            ) ;
            if(!updatedUser){
                  res.status(400) ;
                  throw new Error ;
            }
      }
      const group = await Group.findOneAndUpdate(
            { _id: groupId, "allIds.id": userId },
            { $set: { "allIds.$.confirmation": true } },
            { new: true }
      );
      if(!group){
            res.status(400) ;
            throw new Error("updation not done wrong") ;
      }
      //check for all
      // let flag = true ;
      // let result = [] ;
      // for(let i=0;i<group.allIds.length; ++i){
      //       const fl = group.allIds[i].confirmation ;
      //       flag = flag & fl ;
      //       const id = group.allIds[i].id ;
      //       const user = await User.findById(id) ;
      //       if(user){
      //             result.push({name: user.name, checked: fl}) ;
      //       }

      // }
      // if(!flag){
      //       res.status(200).json({done: false, result: result, groupId:group.id}) ;
      // }
      res.status(200).json({message: "conformation updated!"}) ;
      //confirmed by all
      //next step -> skill and edges deletion
      //Task1: delete the edges using group

      //Task2: delete user under skills sections

      // res.status(200).json({done: true, result: result}) ;

}) ;

// 4. conformation check with backtracking
// METHOD- GET
// API- http://localhost:5000/api/matchingAlgo/user/group/:id
const group = asyncHandler( async(req, res)=>{
      const userId = req.params.id ;
      const user = await User.findById(userId) ;
      let result = [] ;
      let flag = true ;
      for(let i=0;i<user.groups.length; ++i){
            const groupId = user.groups[i].id ;
            const group = await Group.findById(groupId) ;
            // console.log(group);
            let temp = [] ;
            for(let j =0;j<group.allIds.length; ++j){
                  const fl = group.allIds[j].confirmation ;
                  const id = group.allIds[j].id ;
                  const groupUser = await User.findById(id) ;
                  // console.log(groupUser);
                  if(groupUser){
                        flag = flag & fl ;
                        temp.push({name:  groupUser.name, checked: fl}) ;
                  }
            }
            result.push(temp) ;
      }
      console.log(result);
      res.status(200).json({done: true, result: result}) ;

}) ;

module.exports = {matching, graphMatchingAlgo, confirmation, group} ;