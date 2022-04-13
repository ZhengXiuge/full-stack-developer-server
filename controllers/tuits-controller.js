// import posts from "./tuits.js";
// let tuits = posts;

/*
The previous implementation retrieved, updated, and deleted tuits from a tuits array, but we really
want to work with the tuits collection stored in the mongo database. Let's refactor the tuits-controller
to work with the tuits collection in the database instead of the tuits from a local file.
Remove all usage of the array from the tuits-controller and instead import the tuits-dao which will
provide the functionality of interacting with the tuits collection. Add async to all the functions in
tuits-controller since we'll be calling the functions in tuits-dao asynchronously.
 */
import tuitsDao from "tuits-dao.js"

const createTuit = async (req, res) => {
    const newTuit = req.body;
    // newTuit._id = (new Date()).getTime()+'';
    newTuit.postedBy = {
        username: "ReactJS"
    }
    newTuit.liked = false;
    newTuit.disliked = false;
    newTuit.stats = {
        retuits: 111,
        likes: 15,
        dislikes: 10,
        comments: 55
    };
    newTuit.logo_image = "./images/spacex.jpg";
    newTuit.time = "2h";
    newTuit.handle = "ReactJS"
    // tuits.push(newTuit);
    // res.json(newTuit);

    /*
    To refactor createTuit we won't need to create the newTuit's primary key _id since the database
    will do that for us when the document is inserted. We also won't be inserting the newTuit into the array since we're inserting into the tuits collection instead. Don't forget to add async to the signatures since we're calling the DAO's functions asynchronously.
     */
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
}
const findAllTuits = async (req, res) => {
    const tuits = await tuitsDao.findAllTuits()
    res.json(tuits);
}

const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updatedTuit = req.body;
    // tuits = tuits.map(t => t._id === tuitdIdToUpdate ? updatedTuit : t);
    // res.sendStatus(200);

    /*
    Refactoring updateTuit also consists removing references to tuits array since we are updating
    tuits through the DAO function updateTuit.
     */
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updatedTuit);
    res.send(status);
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    // tuits = tuits.filter(t => t._id !== tuitdIdToDelete);
    // res.sendStatus(200);

    /*
    Refactoring deleteTuit consists of removing any references to the tuits array and instead using
    the DAO's deleteTuit to remove the tuit from the tuits collection in the database.
     */
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.send(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findAllTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
