/*
Mongoose schemas describe the structure of the data being stored in the database. The tuits-schema
shown below implements a schema for the tuits collection we worked on earlier.
 */

import mongoose from 'mongoose';        // load mongoose library
const schema = mongoose.Schema(         // create schema
    {
            tuit: String,               // tuit property of type String
            stats: {
                    retuits: Number,
                    comments: Number,
                    likes: Number,         // likes property of type Number
                    dislikes: Number,
            },
            liked: Boolean,
            disliked: Boolean,
            logo_image: String,
            postedBy: {
                    username: String
            },
            time: String,
            handle: String
        }, {collection: 'tuits'});      // which collection name
export default schema;                  // export schema so it can be used elsewhere