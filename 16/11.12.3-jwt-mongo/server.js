const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");

const app = express();
const router = express.Router();

router.use(bodyParser.json());

router.use("/api", require("./api/users"));

// This will use the static middleware
router.use(express.static('public'));

// Add redirects to html files.
router.get('/', (req, res) => {
  res.redirect('/auth.html');
});

app.use(router);

app.listen(3000);