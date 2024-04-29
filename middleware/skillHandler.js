const asyncHandler = require('express-async-handler') ;
const Skills = require('../models/skills') ;

const skillUpdator = asyncHandler(async(skills, type, id) =>{
      for (let i = 0; i < skills.length; i++) {
            const skillName = skills[i].skill;
            const skillLevel = skills[i].level;
            const params = {
              name: skillName,
            };
            const skillExist = await Skills.findOne({ "skill.name": skillName });
            if (skillExist) {
              const skillId = skillExist.id;
              const update = {
                level: skillLevel,
                id: id,
                skillType: type,
              };
              const updatedSkill = await Skills.findByIdAndUpdate(
                skillId,
                { $push: { "skill.levels": update } },
                { new: true }
              );
              if (!updatedSkill) {
                res.status(400);
                throw new Error("Problem in updationg");
              }
            } else {
              const updatedSkill = await Skills.create({
                skill: {
                  name: skillName,
                  levels: {
                    level: skillLevel,
                    id: id,
                    skillType: type,
                  },
                },
              });
              if (!updatedSkill) {
                res.status(400);
                throw new Error("skill not updated!!");
              }
            }
          }
          return true ;
}) ;

module.exports = {skillUpdator} ;