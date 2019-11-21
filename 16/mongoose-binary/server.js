// Node.js libraries.
const fs = require('fs');

// Require model
const Image = require('./models/image.js');

// Require Express and Body Parser support.
const express = require("express");
const bodyParser = require("body-parser");

// Create a new top-level Router and add the body parser middleware.
// Note, we are using body parser support to parse JSON that is being
// sent from the client. This will automatically parse JSON and assign
// a corresponding JavaScript object to the Request object's `body`
// property.
const router = express.Router();

// This will allow the router to parse both json and form data.
router.use(bodyParser.json());

// This will use the static middleware
router.use(express.static('public'));

// Read the kittens image from the file system.
const kittens = fs.readFileSync('kittens.jpeg');

// Create a new Mongoose Image object.
const image = new Image({ 
  name : 'kittens', 
  data : kittens, 
  contentType : 'image/jpeg'
});

// Save the Image to the database.
image.save((err, id) => {
  // If there is an error we print it out and exit the process.
  // Otherwise, we simply print the object id that was received back. 
  if (err) {
    console.log(err);
    process.exit(1);
  }
  else {
    console.log(id);
  }
});

// A route to send the binary data of the kittens image that
// we stored in the database above.
router.get('/kittens', (req, res) => {
  
  // Find the image by Mongo ObjectID:
  Image.findById(image._id, (err, doc) => {
    // Handle the error if there is one by passing it off to the next
    // route handler.
    if (err) return next(err);

    // Set the content type of the response.
    res.contentType(doc.contentType);

    // Send the binary image data as the response data.
    res.send(doc.data);
  });

});

// A simple route to send an HTML document to be rendered. Notice that
// it references the /kittens route to be displayed as an image.
router.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Kittens</title></head>
      <body>
        <p>Don't you just love kittens!</p>
        <img src="/kittens">
      </body>
    </html>
  `);
});

// Create out express application and add our main router.
const app = express();
app.use(router);

// Listen on port 3000.
app.listen(3000, () => {
  console.log('Serving running on port 3000');
});