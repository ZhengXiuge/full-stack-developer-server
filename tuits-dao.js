/*
It is good practice to encapsulate all data access into a handful set of files such as the following
Data Access Object (DAO) where we'll implement all MongoDB interactions with the tuits collection.
 */
import tuitsModel from './tuits-model.js';
export const findAllTuits = () => tuitsModel.find();
export const createTuit = (tuit) => tuitsModel.create(tuit);
export const deleteTuit = (tid) => tuitsModel.deleteOne({_id: tid});
export const updateTuit = (tid, tuit) => tuitsModel.updateOne({_id: tid}, {$set: tuit})