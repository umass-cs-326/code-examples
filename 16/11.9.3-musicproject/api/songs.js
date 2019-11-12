// An Express Router allows us to develop modular route handlers. This
// is useful when we want to develop independent APIs or to simply
// organize different aspects of our application.
const router = require("express").Router();

// Require the Song model.
const Song = require("../models/song");

// API endpoint to retrieve all songs in the database.
// We send an HTTP response with the list of songs as JSON.
router.get("/", (req, res) => {
    Song.find((err, songs) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(songs);
        }
    });
});

// API endpoint to add a new song to the database.
//   Note: we expect to receive JSON that represents a Song.
// We send an HTTP response with the Song as JSON.
router.post("/", (req, res) => {
    let song = new Song(req.body);
    song.save((err, song) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(song);
        }
    });
});

// API endpoint to search songs by genre.
// This api expects a query string of the following form:
//   /search?genre=funk
//   /search?genre=soul
//   /search?genre=rock
// We send an HTTP response with the Sons as JSON.
router.get("/search", (req, res) => {
    let query = {};
    
    // Check if genre was supplied in query string
    if (req.query.genre) {
        query = { genre: [ req.query.genre ] };
    }

    Song.find(query, (err, songs) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(songs);
        }
    });
});

// API endpoint to find an exact resource by ID.
// We send an HTTP response with the Song found by ID.
router.get("/:id", (req, res) => {
    // Use the ID in the URL path to find the song
    Song.findById(req.params.id, (err, song) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(song);
        }
    });
});

// API endpoint to update a song given a JSON object with an `_id`
// property and other properties to be used to update the existing
// song.
// We send an HTTP status code.
router.put("/", (req, res) => {
    // Song to update sent in body of request
    const song = req.body;

    // Replace existing song fields with updated song
    Song.findByIdAndUpdate(song._id, song, (err, song) => {
        if (err) {
            // Bad Request response status code indicates that the
            // server cannot or will not process the request due to
            // something that is perceived to be a client error
            res.status(400).send(err);
        } else if (song) {
            // The HTTP 204 No Content success status response code
            // indicates that the request has succeeded, but that the
            // client doesn't need to go away from its current page.
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    });
});

// API endpoint to delete a song given a JSON object with an `_id`
// property and other properties to be used to update the existing
// song.
// We send an HTTP status code.
router.delete("/:id", function(req, res) {
    Song.findByIdAndRemove(req.params.id, function(err, song) {
        if (err) {
            res.status(400).send(err);
        } else if (song) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    });
});

// Export the router to the client application.
module.exports = router;