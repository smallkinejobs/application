import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, profile, roles) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: profile,
  });
  if (roles.includes('employee')) {
    Roles.addUsersToRoles(userID, 'employee');
  }
  if (roles.includes('employer')) {
    Roles.addUsersToRoles(userID, 'employer');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    const defaultAccounts = Meteor.settings.defaultAccounts;
    defaultAccounts.map(({ email, password, profile, roles }) => createUser(email, password, profile, roles));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

Meteor.publish('UserProfiles', function publish() {
  return Meteor.users.find({}, { fields: { username: 1, profile: 1 } });
});
