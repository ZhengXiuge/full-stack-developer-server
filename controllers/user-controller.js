/*
Controllers are responsible for defining HTTP endpoints that clients can invoke through a request,
cause some function execution on the server, and respond with a result. Creating a controller per
type of data is a common strategy to break up the source code.
The user controller below will implement several HTTP endpoints to create, read, update, and delete
users. It is a common strategy to group together CRUD (create, read, update and delete) operations
under one controller.
 */

// Function findAllUsers below retrieves the list of all users from the server and is mapped to the HTTP endpoint /api/users.
import people from './users.js'; // import the array of users
let users = people;

const userController = (app) => { // use express instance app to declare HTTP GET
    app.get('/api/users', findAllUsers); // request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const findAllUsers = (req, res) => { // function runs when /api/users requested
    /*
    We can also send data to a server as query string parameters, path parameters, and embedded in
    the request body. The example below demonstrates how to work with query string parameters encoded
    at the end of a URL after a question mark (?). Query string parameters are name value pairs
    separated by ampersands (&).
     */
    // The example below refactors the findAllUsers function to check for query strings with the type of user we want, and retrieve all of them if type is omitted.
    const type = req.query.type; // retrieve type parameter from query

    function findUsersByType(type) {
        return users.filter(user => user.type === type);
    }

    if(type) {                   // if type parameter in query
        res.json(findUsersByType(type)); // find all users of that type and respond
        return;                          // return so it doesn't continue
    }

    res.json(users);                // responds with array of users

}

/*
The example below illustrates encoding the ID of a user as part of the URL path pattern /api/users/:uid.
The colon (:) followed by uid declares a placeholder that match any literal string. The actual value
in the placeholder can be retrieved using uid as a key into the request's params map.
 */
const findUserById = (req, res) => {
    // const userId = req.params.uid;
    const userId = req.params["uid"]
    const user = users.find(u => u._id === userId);
    res.json(user);
}

/*
The function createUser below can read data posted to the server, embedded in the HTTP request body,
and interpret it as a new user and stores in the users array.
 */
const createUser = (req, res) => {
    // Alternatively data can be sent to the server embedded in the body of the HTTP request where it can be encrypted for safe transmission.
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
}

const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr =>
                             usr._id !== userId);
    res.sendStatus(200);
}

/*
To update the collection of users we'll re-create a brand new array of users swapping the old user
with the new version of the user. We'll iterate through the original array of users and when we find
the user that needs to be updated we'll discard the old version and keep the new one
 */
const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updatedUser = req.body;
    users = users.map(usr =>
                          usr._id === userId ?
                          updatedUser :
                          usr);
    res.sendStatus(200);
}



export default userController; // exports so server.js can import