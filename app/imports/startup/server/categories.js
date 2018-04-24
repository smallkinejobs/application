import { Meteor } from 'meteor/meteor';
import { Categories, CategoriesString } from '../../api/categories/categories.js';

/** Initialize the database with default categories. */
function addCategory(category) {
  console.log(`  Adding: ${category.title}`);
  Categories.insert(category);
}

/** Initialize the collection if empty. */
if (Categories.find().count() === 0) {
  if (Meteor.settings.defaultCategories) {
    console.log('Creating default categories.');
    Meteor.settings.defaultCategories.map(category => addCategory(category));
  }
}

/** This subscription publishes all categories */
Meteor.publish('CategoriesString', function publish() {
  return Categories.find({});
});
