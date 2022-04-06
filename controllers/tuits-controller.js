import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
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
    tuits.push(newTuit);
    res.json(newTuit);
}
const findAllTuits = (req, res) => {
    res.json(tuits);
}
const updateTuit = (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updatedTuit = req.body;
    tuits = tuits.map(t => t._id === tuitdIdToUpdate ? updatedTuit : t);
    res.sendStatus(200);

}
const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    tuits = tuits.filter(t => t._id !== tuitdIdToDelete);
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findAllTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
