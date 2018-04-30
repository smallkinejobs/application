import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/jobs/jobs.js';


/** Initialize the database with a default job document. */
function addJob(job) {
  job.postDate = Date.parse(job.postDate); // eslint-disable-line
  console.log(`  Adding: ${job.title} Skills: (${job.skills.map((skill) => skill.name)})`);
  Jobs.insert(job);
}

/** Initialize the collection if empty. */
if (Jobs.find().count() === 0) {
  if (Meteor.settings.defaultJobs) {
    console.log('Creating default data.');
    Meteor.settings.defaultJobs.map(job => addJob(job));
  }
}

/** This subscription publishes all jobs that are currently open */
Meteor.publish('SearchedJobs', function publish() {
  return Jobs.find({ open: 1 });
});

Meteor.publish('UserJobs', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;

    if (Roles.userIsInRole(this.userId, 'employer')) {
      return Jobs.find({ employerId: username });
    }
    if (Roles.userIsInRole(this.userId, 'employee')) {
      return Jobs.find({ employeeId: username });
    }

  }
  return this.ready();
});
