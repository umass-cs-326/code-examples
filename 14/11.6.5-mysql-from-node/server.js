let mysql = require("mysql");

let conn = mysql.createConnection({
    host:     "localhost",
    user:     "root",
    password: "password",
    database: "test"
});

conn.connect(function(err) {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    }
    else {
        console.log("Connection established");
    }
});