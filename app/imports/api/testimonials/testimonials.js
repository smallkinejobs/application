import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create the Testimonials Meteor collection. */
const TestimonialsString = 'Testimonials';
const Testimonials = new Mongo.Collection(TestimonialsString);

/** Create a schema to constrain the structure of documents associated with this collection. */
const TestimonialSchema = new SimpleSchema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  comment: String,
  name: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Testimonials.attachSchema(TestimonialSchema);

/** Make the collection, subscription string, and schema available to other code. */
export { Testimonials, TestimonialsString, TestimonialSchema};
