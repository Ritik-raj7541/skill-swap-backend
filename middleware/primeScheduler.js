const asyncHandler = require('express-async-handler') ;

const schedulingAlgo = asyncHandler( async(registeringTimes, links, userSchedules ) =>{
  // console.log(userSchedules);
      registeringTimes.sort((a, b) => {
            return new Date(a.time) - new Date(b.time);
          });
        
          // Sort the links array based on time and registering times
          links.sort((a, b) => {
            // Compare link times
                const timeComparison = new Date(a.time) - new Date(b.time);
                if (timeComparison !== 0) {
                    return timeComparison;
                } else {
                    // If link times are equal, compare registering times of the users
                    const user1RegisteringTime = registeringTimes.find(user => user.userId === a.teacher).time;
                    const user2RegisteringTime = registeringTimes.find(user => user.userId === b.teacher).time;
                    return new Date(user1RegisteringTime) - new Date(user2RegisteringTime);
                }
            });
        
        
          let intersectedLinks = links.map((link) => {
        
            const teacher = userSchedules.find(userSchedule => userSchedule.user === link.teacher);
            const student = userSchedules.find(userSchedule => userSchedule.user === link.student);
            // console.log(link);
            const intersectionSchedule = teacher.schedule.map((daySchedule , index_i) => daySchedule.map((isFree , index_j) => isFree && student.schedule[index_i].timeSlots[index_j] ));
            const timePerWeek = parseInt((parseInt(teacher.teachTime) + parseInt(student.learnTime))/2);
            
            return{
              ...link,
              intersectionSchedule: intersectionSchedule,
              timePerWeek: timePerWeek
            }
          });
        
        
          // [
          //   {
          //     user: userid,
          //     userIntersect: ((link where userid is student) ^ (link where userid is teacher)),
          //     totalAvailable: number (total number of trues in the intersection)
          //   }
          // ]
        
          let userIntersections = intersectedLinks.reduce((result , linkTeacher) => {
              const linkStudent = intersectedLinks.find(link => link.student === linkTeacher.teacher);
        
              const teacherSchedule = linkTeacher.intersectionSchedule;
              const studentSchedule = linkStudent.intersectionSchedule;
        
              let ctr = 0;
              const userIntersect = teacherSchedule.map((daySchedule , index_i) => daySchedule.map((isFree , index_j) => {
                const available = isFree && studentSchedule[index_i][index_j];
                if (available) {
                  ctr += 1;
                } 
                return available;
              }));
        
              const intersectionObj = {
                user: linkTeacher.teacher,
                userIntersect: userIntersect,
                totalAvailable: ctr
              }
              
              return [...result , intersectionObj]
          } , []);
        
          // console.log(userIntersections);
        
        
          // {
          //   intersectedLinks.intersectionSchedule - (userIntersections(intersectedLinks.student) U userIntersections(intersectedLinks.teacher))
          // }
        
          const findUnion = (user1 , user2) => {
            const schedule1 = userIntersections.find((user) => user.user===user1).userIntersect;
            const schedule2 = userIntersections.find((user) => user.user===user2).userIntersect;
            
            const scheduleUnion = schedule1.map((daySchedule , index_i) => daySchedule.map((isFree , index_j) => isFree || schedule2[index_i][index_j] ));
            return scheduleUnion;
          }
        
          let uniqueLinkSchedules = intersectedLinks.map((link) => {
            const union = findUnion(link.teacher , link.student);
            
            let ctr = 0;
            const onlyLinkSchedule = link.intersectionSchedule.map((daySchedule , index_i) => daySchedule.map((isFree , index_j) => {
              const available = (isFree && union[index_i][index_j])?false: isFree;
              if (available) {
                ctr += 1;
              } 
              return available;
            }));
        
            // console.log( union[0] );
            const {teacher , student} = link;
        
            const tAvail = userIntersections.find(user => user.user === teacher).totalAvailable;
            const sAvail = userIntersections.find(user => user.user === student).totalAvailable;
        
            let primary = '' , second='';
            if (tAvail<=sAvail){
              primary = teacher;
              second = student;
            } else {
              primary = student;
              second = teacher;
            }
        
            const intersectionObj = {
              intersectionArray: onlyLinkSchedule,
              timePerWeek: link.timePerWeek,
              teacher: link.teacher,
              student: link.student,
              skill: link.skill,
              totalAvailable: ctr,
              primaryUser: primary,
              secondaryUser: second
            }
            
            return intersectionObj;
          })
        
          // console.log(uniqueLinkSchedules);
        
        
          // Initialize a 7x24 matrix with empty arrays in each cell
          // This array is initialized to store the answer
          let scheduleMatrix = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => []));
          let weeklyRemainingClass = [];
        
          for( let item=0 ; item<uniqueLinkSchedules.length ; item++ ) {
            
            let linkSchedule = uniqueLinkSchedules[item].intersectionArray;
            let scheduleHours = uniqueLinkSchedules[item].timePerWeek;
            let remainingSlots = uniqueLinkSchedules[item].totalAvailable;
            
            // console.log(scheduleHours , remainingSlots);
        
            let i=0, j=0;
            while(i<linkSchedule.length && j<linkSchedule[0].length && scheduleHours > 0 && remainingSlots >= 0){
              if(linkSchedule[i][j]){
                // console.log('yes');
                scheduleMatrix[i][j] = [...scheduleMatrix[i][j] , {
                  teacher: uniqueLinkSchedules[item].teacher,
                  student: uniqueLinkSchedules[item].student,
                  skill: uniqueLinkSchedules[item].skill,
                }];
                scheduleHours -= 1;
                remainingSlots -= 1;
                linkSchedule[i][j] = false;
                uniqueLinkSchedules[item].intersectionArray[i][j] = false;
                intersectedLinks[item].intersectionSchedule[i][j] = false;
              }
              if(j==23){
                i+=1;
                j=0;
              }else{
                j+=1;
              }
            }
        
            if(scheduleHours > 0){
              let {userIntersect , totalAvailable} = userIntersections.find(user => user.user === uniqueLinkSchedules[item].primaryUser).userIntersect;
              // console.log(primaryUserIntersection);
              let ip=0 , jp=0;
              while(i<linkSchedule.length && j<linkSchedule[0].length && scheduleHours > 0 && totalAvailable >= 0){
                if(userIntersect[i][j]){
                  scheduleMatrix[i][j] = [...scheduleMatrix[i][j] , {
                    teacher: uniqueLinkSchedules[item].teacher,
                    student: uniqueLinkSchedules[item].student,
                    skill: uniqueLinkSchedules[item].skill,
                  }];
                  scheduleHours -= 1;
                  totalAvailable -= 1;
                  userIntersect[i][j] = false;
                  intersectedLinks[item].intersectionSchedule[i][j] = false;
                }
                if(j==23){
                  i+=1;
                  j=0;
                }else{
                  j+=1;
                }
              }
              userIntersections.find(user => user.user === uniqueLinkSchedules[item].primaryUser).userIntersect = userIntersect;
              userIntersections.find(user => user.user === uniqueLinkSchedules[item].primaryUser).totalAvailable = totalAvailable;
            }
        
            if(scheduleHours > 0){
              let {userIntersect , totalAvailable} = userIntersections.find(user => user.user === uniqueLinkSchedules[item].secondaryUser).userIntersect;
              // console.log(primaryUserIntersection);
              let ip=0 , jp=0;
              while(i<linkSchedule.length && j<linkSchedule[0].length && scheduleHours > 0 && totalAvailable >= 0){
                if(userIntersect[i][j]){
                  scheduleMatrix[i][j] = [...scheduleMatrix[i][j] , {
                    teacher: uniqueLinkSchedules[item].teacher,
                    student: uniqueLinkSchedules[item].student,
                    skill: uniqueLinkSchedules[item].skill,
                  }];
                  scheduleHours -= 1;
                  totalAvailable -= 1;
                  userIntersect[i][j] = false;
                  intersectedLinks[item].intersectionSchedule[i][j] = false;
                }
                if(j==23){
                  i+=1;
                  j=0;
                }else{
                  j+=1;
                }
              }
              userIntersections.find(user => user.user === uniqueLinkSchedules[item].secondaryUser).userIntersect = userIntersect;
              userIntersections.find(user => user.user === uniqueLinkSchedules[item].secondaryUser).totalAvailable = totalAvailable;
            }
        
            uniqueLinkSchedules[item].timePerWeek = scheduleHours;
            weeklyRemainingClass = [...weeklyRemainingClass , {
              teacher: uniqueLinkSchedules[item].teacher,
              student: uniqueLinkSchedules[item].student,
              skill: uniqueLinkSchedules[item].skill,
              remainingHoursToSchedule: scheduleHours
            }]
          }
        
          // console.log(scheduleMatrix , weeklyRemainingClass);
        
          return {
            weeklyRemainingClass, 
            scheduleMatrix
          };
        
        
}) ;
module.exports = {schedulingAlgo} ;