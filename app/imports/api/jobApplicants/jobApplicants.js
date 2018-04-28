import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create the Jobs Meteor collection. */
const JobApplicants = new Mongo.Collection('JobApplicants');

/** Create a schema to constrain the structure of documents associated with this collection. */
const JobApplicantSchema = new SimpleSchema({
    jobId: String,
    applicantIds: { type: Array, optional: true },
  'applicantIds.$': String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
JobApplicants.attachSchema(JobApplicantSchema);

/** Make the collection and schema available to other code. */
export { JobApplicants, JobApplicantSchema };
