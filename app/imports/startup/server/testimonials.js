import { Meteor } from 'meteor/meteor';
import { Testimonials } from '../../api/testimonials/testimonials.js';

/** Initialize the database with default categories. */
function addTestimonial(testimonial) {
  console.log(`  Adding testimonial for: ${testimonial.name}`);
  Testimonials.insert(testimonial);
}

/** Initialize the collection if empty. */
if (Testimonials.find().count() === 0) {
  if (Meteor.settings.defaultTestimonials) {
    console.log('Creating default testimonial.');
    Meteor.settings.defaultTestimonials.map(testimonial => addTestimonial(testimonial));
  }
}

/** This publication publishes all of the ratings in the Testimonials collection */
Meteor.publish('AllTestimonials', function publish() {
  return Testimonials.find({});
});
