import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create the JobCategories Meteor collection. */
const CategoriesString = 'Categories';
const Categories = new Mongo.Collection(CategoriesString);

/** Create a schema to constrain the structure of documents associated with this collection. */
const CategorySchema = new SimpleSchema({
  title: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Categories.attachSchema(CategorySchema);

/** Make the collection, subscription string, and schema available to other code. */
export { Categories, CategoriesString, CategorySchema };
