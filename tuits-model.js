/*
Mongoose models provide functions for interacting with MongoDB. The functions are similar to the ones
found in the mongo client: find(), updateOne(), removeOne(), etc. In tuits-model.js, create a Mongoose
model from the tuit schema as shown below. The functions provided by Mongoose models are deliberately
generic because they can interact with any collection configured in the schema.
 */
import mongoose from 'mongoose';            // load mongoose library
import tuitsSchema from 'tuits-schema.js' // load tuits schema
const tuitsModel = mongoose                 // create mongoose model from the schema
    .model('TuitModel', tuitsSchema);
export default tuitsModel;                  // export so it can be used elsewhere