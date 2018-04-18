import { Meteor } from 'meteor/meteor';
import { Skills, SkillsString } from '../../api/skills/skills.js';

/** Initialize the database with default skills. */
function addSkill(skill) {
  console.log(`  Adding: ${skill.name}`);
  Skills.insert(skill);
}

/** Initialize the collection if empty. */
if (Skills.find().count() === 0) {
  if (Meteor.settings.defaultSkills) {
    console.log('Creating default categories.');
    Meteor.settings.defaultSkills.map(skill => addSkill(skill));
  }
}

/** This subscription publishes all skills in the collection */
Meteor.publish(SkillsString, function publish() {
  return Skills.find({});
});
