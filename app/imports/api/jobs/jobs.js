import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create the Jobs Meteor collection. */
const Jobs = new Mongo.Collection('Jobs');

/** sub-schema for the skills */
const skillsSchema = new SimpleSchema({
  _id: Number,
  name: String,
});

/** Create a schema to constrain the structure of documents associated with this collection. */
const JobSchema = new SimpleSchema({
  title: String,
  description: String,
  employerName: String,
  open: Boolean,
  location: String,
  pay: Number,
  postDate: Date,
  skills: Array,
  'skills.$': skillsSchema,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Jobs.attachSchema(JobSchema);

/** Make the collection and schema available to other code. */
export { Jobs, JobSchema };
