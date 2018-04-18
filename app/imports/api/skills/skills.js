import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create the JobCategories Meteor collection. */
const SkillsString = 'Skills';
const Skills = new Mongo.Collection(SkillsString);

/** Create a schema to constrain the structure of documents associated with this collection. */
const SkillSchema = new SimpleSchema({
  name: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Skills.attachSchema(SkillSchema);

/** Make the collection, subscription string, and schema available to other code. */
export { Skills, SkillsString, SkillSchema };
