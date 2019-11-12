// server.js
const express = require("express");
const app = express();
const bodyparser = require('body-parser');
let mysql = require("mysql");

// Serve static files from the public dir
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));

// Connect to the database.
let conn = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  password: "password",
  database: "test"
});

// Connect to the database
conn.connect(function(err) {
  if (err) {
      console.log("Error connecting to MySQL:", err);
  }
  else {
      console.log("Connection established");

      app.post("/create", function(req, res) {
        // Get values from the form
        let student = { name: req.body.name, gpa: req.body.gpa };    
      
        conn.query("INSERT INTO students SET ?", student, function(err, result) {
            if (err)
                res.send(err);
            else 
                res.send("Inserted student with ID " + result.insertId);
        }); 
      });
      
  }
});


app.listen(3000, () => {
  console.log('Visit http://localhost:3000/student.html to see this example');
});