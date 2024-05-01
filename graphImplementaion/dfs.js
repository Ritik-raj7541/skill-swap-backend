const asyncHandler = require('express-async-handler') ;
const Skill = require('../models/skills');
const Graph = require('../models/graph');


const dfsWhichGivesCycle = asyncHandler( async(id)=>{
      // console.log(id);
      let vis = {} ;
      let pathVis = {} ;
      let cycledPair = [] ;
      let tempPair = [] ;
      const dfs = async (currId, parentId, skill, link)=>{
            if(vis[currId] === 1 && pathVis[currId] === 1 && id === currId){
                  const newPair = {
                        teacher: parentId,
                        student: currId,
                        skill: skill,
                        time: link
                      }
                  tempPair.push(newPair) ;
                  tempPair = tempPair.slice(1) ;
                  cycledPair.push(...tempPair) ;
                  // console.log(cycledPair);
                  return true;
            }
            else if(vis[currId] === 1 && pathVis[currId] === 1){
                  return true;
            }
            else if(vis[currId === 1]){
                  return true;
            }
            vis[currId] = 1 ;
            pathVis[currId] = 1 ;
            const pair = {
                  teacher: parentId,
                  student: currId,
                  skill: skill,
                  time: link
                }
                
            tempPair.push(pair) ;
            const edges = await Graph.find({teacher: currId}) ;
            
            for(let i=0;i<edges.length; ++i){
                  const childId = edges[i].student ;
                  const skill = edges[i].skill ;
                  const link = edges[i].linkTime ;
                  const result = await dfs(childId, currId, skill, link) ;
            }
            pathVis[currId] = 0 ;
            tempPair.pop() ;
      }
      const result = await dfs(id, "ritik", "dontnow", "time") ;
      console.log(result);
      if(result === undefined){
            // console.log(cycledPair);
            return cycledPair
      }
      // console.log(cycledPair);
      // return cycledPair.slic ;
      return [] ;
      // vis['string'] = 1 ;
      // console.log(vis['string'] === 1);
}) ;

module.exports = dfsWhichGivesCycle ;