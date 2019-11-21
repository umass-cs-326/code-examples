// Require the db module connect to our MongoDB database and return a
// Mongoose instance.
var db = require("../db");

// Create a model from the schema
var Image = db.model("Image", {
  name : String,
  data : Buffer,
  contentType : String
});

// Export the Song model.
module.exports = Image;
