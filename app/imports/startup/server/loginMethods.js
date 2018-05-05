import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';

Meteor.methods({
  addToRole: (userId, role) => {
    check(userId, String);
    check(role, String);
    Roles.addUsersToRoles(userId, role);
  },
});
