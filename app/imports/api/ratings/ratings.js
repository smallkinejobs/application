import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create the JobCategories Meteor collection. */
const RatingsString = 'Ratings';
const Ratings = new Mongo.Collection(RatingsString);

/** Create a schema to constrain the structure of documents associated with this collection. */
const RatingSchema = new SimpleSchema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  user: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Ratings.attachSchema(RatingSchema);

/** Make the collection, subscription string, and schema available to other code. */
export { Ratings, RatingsString, RatingSchema };
