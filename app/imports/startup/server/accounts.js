import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, profile, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: profile,
  });
  if (role === 'employee') {
    Roles.addUsersToRoles(userID, 'employee');
  }
  if (role === 'employer') {
    Roles.addUsersToRoles(userID, 'employer');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    const defaultAccounts = Meteor.settings.defaultAccounts;
    defaultAccounts.map(({ email, password, profile, role }) => createUser(email, password, profile, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
