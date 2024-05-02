const registeringTimes = [
      { userId: "user3", time: "2024-05-04T08:45:00Z" }, // User 3 registration time
      { userId: "user2", time: "2024-05-03T08:20:00Z" }, // User 2 registration time
      { userId: "user4", time: "2024-05-05T09:30:00Z" }, // User 4 registration time
      { userId: "user1", time: "2024-05-02T08:00:00Z" }  // User 1 registration time
  ];
  
  registeringTimes.sort((a, b) => {
      return new Date(a.time) - new Date(b.time);
  });
  
  
  const links = [
      { teacher: "user1", student: "user2", skill: "JavaScript", time: "2024-05-04T09:00:00Z" }, // User 1 teaches User 2
      { teacher: "user3", student: "user4", skill: "Python", time: "2024-05-02T10:30:00Z" },   // User 3 teaches User 4
      { teacher: "user2", student: "user3", skill: "Java", time: "2024-05-04T09:00:00Z" },     // User 2 teaches User 3
      { teacher: "user4", student: "user1", skill: "C++", time: "2024-05-03T13:15:00Z" }       // User 4 teaches User 1
  ];
  
  const schedules = [
      {
        teacher: "user1",
        student: "user2",
        teacherSchedule: [
          { day: "Monday", timeSlots: [true, false, true, true, false, true, false, true, false, false, true, false, true, true, true, true, false, false, true, false, true, false, true, false] }, // Example availability for Monday
          { day: "Tuesday", timeSlots: [true, true, true, true, true, true, false, true, false, true, false, true, false, true, true, false, true, false, true, true, true, false, true, true] }, // Example availability for Tuesday
          { day: "Wednesday", timeSlots: [false, true, false, true, true, true, true, true, false, true, false, false, true, true, true, false, true, false, true, true, false, true, true, false] }, // Example availability for Wednesday
          { day: "Thursday", timeSlots: [true, true, true, false, false, true, false, true, true, false, true, false, true, false, false, true, true, true, false, false, true, false, false, true] }, // Example availability for Thursday
          { day: "Friday", timeSlots: [false, false, true, false, true, false, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true, false, true] }, // Example availability for Friday
          { day: "Saturday", timeSlots: [false, true, false, true, true, false, false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, false, true, false] }, // Example availability for Saturday
          { day: "Sunday", timeSlots: [true, false, true, false, true, true, false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, false, true, false] } // Example availability for Sunday      
      ],
        studentSchedule: [
          { day: "Monday", timeSlots: [true, true, false, true, true, false, true, true, true, false, true, false, false, true, true, false, true, false, true, true, false, true, true, false] }, // Example availability for Monday
          { day: "Tuesday", timeSlots: [true, true, true, true, false, true, false, true, false, true, false, true, false, true, true, false, true, false, true, true, true, true, false, true] }, // Example availability for Tuesday
          { day: "Wednesday", timeSlots: [false, false, true, false, true, false, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true, false, true] }, // Example availability for Wednesday
          { day: "Thursday", timeSlots: [true, true, false, true, true, false, true, true, true, false, true, false, false, true, true, false, true, false, true, true, false, true, true, false] }, // Example availability for Thursday
          { day: "Friday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true, false, true] }, // Example availability for Friday
          { day: "Saturday", timeSlots: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, false, true, false] }, // Example availability for Saturday
          { day: "Sunday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true, false, true] } // Example availability for Sunday
      ]
      },
      {
        teacher: "user3",
        student: "user4",
        teacherSchedule: [
          { day: "Monday", timeSlots: [false, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false] },
          { day: "Tuesday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false] },
          { day: "Wednesday", timeSlots: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true] },
          { day: "Thursday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false] },
          { day: "Friday", timeSlots: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true] },
          { day: "Saturday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false] },
          { day: "Sunday", timeSlots: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true] }
        ],
        studentSchedule: [
          { day: "Monday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false] },
          { day: "Tuesday", timeSlots: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true] },
          { day: "Wednesday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false] },
          { day: "Thursday", timeSlots: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true] },
          { day: "Friday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false] },
          { day: "Saturday", timeSlots: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true] },
          { day: "Sunday", timeSlots: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false] }
        ]
      },
      {
        teacher: "user4",
        student: "user1",
        teacherSchedule: [
          { day: "Monday", timeSlots: [true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false] },
          { day: "Tuesday", timeSlots: [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true] },
          { day: "Wednesday", timeSlots: [true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false] },
          { day: "Thursday", timeSlots: [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true] },
          { day: "Friday", timeSlots: [true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false] },
          { day: "Saturday", timeSlots: [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true] },
          { day: "Sunday", timeSlots: [true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false] }
        ],
        studentSchedule: [
          { day: "Monday", timeSlots: [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true] },
          { day: "Tuesday", timeSlots: [true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false] },
          { day: "Wednesday", timeSlots: [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true] },
          { day: "Thursday", timeSlots: [true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false] },
          { day: "Friday", timeSlots: [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true] },
          { day: "Saturday", timeSlots: [true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false] },
          { day: "Sunday", timeSlots: [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true] }
        ]
      },
      {
        teacher: "user2",
        student: "user3",
        teacherSchedule: [
          { day: "Monday", timeSlots: [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true] },
          { day: "Tuesday", timeSlots: [true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false] },
          { day: "Wednesday", timeSlots: [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true] },
          { day: "Thursday", timeSlots: [true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false] },
          { day: "Friday", timeSlots: [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true] },
          { day: "Saturday", timeSlots: [true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false] },
          { day: "Sunday", timeSlots: [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true] }
        ],
        studentSchedule: [
          { day: "Monday", timeSlots: [true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false] },
          { day: "Tuesday", timeSlots: [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true] },
          { day: "Wednesday", timeSlots: [true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false] },
          { day: "Thursday", timeSlots: [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true] },
          { day: "Friday", timeSlots: [true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false] },
          { day: "Saturday", timeSlots: [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true] },
          { day: "Sunday", timeSlots: [true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false] }
        ]
      },
      // Add schedules for the remaining links...
  ];
  
  // console.log(schedules);
  
  
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
  
  // console.log(links);
    
  
  links.forEach(link => {
      const { teacherSchedule , studentSchedule } = schedules.find(user => user.student === link.student && user.teacher === link.teacher);
      link.intersectedSchedule = teacherSchedule.map((daySchedule , index_i) => daySchedule.timeSlots.map((isFree , index_j) => isFree && studentSchedule[index_i].timeSlots[index_j] ))
  });
  
  console.log(links);