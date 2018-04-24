import { Meteor } from 'meteor/meteor';
import { Ratings } from '../../api/ratings/ratings.js';

/** Initialize the database with default categories. */
function addRating(rating) {
  console.log(`  Adding rating for: ${rating.user}`);
  Ratings.insert(rating);
}

/** Initialize the collection if empty. */
if (Ratings.find().count() === 0) {
  if (Meteor.settings.defaultRatings) {
    console.log('Creating default ratings.');
    Meteor.settings.defaultRatings.map(rating => addRating(rating));
  }
}

/** This subscription publishes all ratings tied to the current user */
Meteor.publish('UserRatings', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Ratings.find({ user: username });
  }
  return this.ready();
});
