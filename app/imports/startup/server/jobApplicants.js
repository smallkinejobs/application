import { Meteor } from 'meteor/meteor';
import { JobApplicants } from '../../api/jobApplicants/jobApplicants.js';

/** Initialize the database with a default job document. */
function addJobApplicant(newJobApplicant) {
  console.log(`  Adding user ids: ${newJobApplicant.applicantIds} to Job: (${newJobApplicant.jobId})`);
  JobApplicants.insert(newJobApplicant);
}

/** Initialize the collection if empty. */
if (JobApplicants.find().count() === 0) {
  if (Meteor.settings.defaultJobApplicants) {
    console.log('Creating default Job Applicants.');
    Meteor.settings.defaultJobApplicants.map(ja => addJobApplicant(ja));
  }
}

Meteor.publish('JobApplicants', function publish() {
  return JobApplicants.find();
})
