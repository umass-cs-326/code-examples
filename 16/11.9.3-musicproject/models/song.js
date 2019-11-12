// Require the db module connect to our MongoDB database and return a
// Mongoose instance.
var db = require("../db");

// Create a model from the schema
var Song = db.model("Song", {
    title:       { type: String, required: true },
    artist:      String,
    popularity:  { type: Number, min: 1, max: 10 },
    releaseDate: { type: Date, default: Date.now },
    genre:       [ String ]
});

// Export the Song model.
module.exports = Song;
