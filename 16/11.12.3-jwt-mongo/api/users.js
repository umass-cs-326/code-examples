const jwt = require("jwt-simple");
const User = require("../models/user");
const router = require("express").Router();

// For encoding/decoding JWT
const secret = "supersecret";

// Add a new user to the database
router.post("/user", function(req, res) {
   const newuser = new User({
      username: req.body.username,
      password: req.body.password,
      status:   req.body.status
   });

   newuser.save(function(err) {
      if (err) console.log(err);
      res.sendStatus(201);  // Created
   });
});

// Sends a token when given valid username/password
router.post("/auth", function(req, res) {   
   // Get user from the database
   User.findOne({ username: req.body.username }, function(err, user) {      
      if (err) throw err;

      if (!user) {
         // Username not in the database
         res.status(401).json({ error: "Bad username"});
      }
      else {
         // Check if password from database matches given password
         if (user.password != req.body.password) {
            res.status(401).json({ error: "Bad password"});
         }
         else {
            // Send back a token that contains the user's username
            const token = jwt.encode({ username: user.username }, secret);
            res.json({ token: token });
         }
      }
   });
});

// Gets the status of all users when given a valid token
router.get("/status", function(req, res) {

   // See if the X-Auth header is set
   if (!req.headers["x-auth"]) {
      return res.status(401).json({error: "Missing X-Auth header"});
   }

   // X-Auth should contain the token 
   const token = req.headers["x-auth"];
   try {
      const decoded = jwt.decode(token, secret);

      // Send back all username and status fields
      User.find({}, "username status", function(err, users) {
         res.json(users);
      });
   }
   catch (ex) {
      res.status(401).json({ error: "Invalid JWT" });
   }
});

module.exports = router;