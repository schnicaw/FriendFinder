// Dependencies
// =============================================================
var express = require("express");
//var bodyParser = require("body-parser");
//var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var path = require("path");

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

app.use(bodyParser.text({ type: 'text/html' }))

// Data
var characters = [
  {
      routeName: "yoda",
      name: "Yoda",
      role: "Jedi Master",
      age: 900,
      forcePoints: 2000
  },
];


// Sets up the Express app to handle data parsing
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


//Routes
//====================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/:characters?", function(req, res) {

  var chosen = req.params.characters;

  if(chosen) {

  console.log(chosen);

  for (var i=0; i<characters.length; i++) {
    if (chosen===characters[i].routeName) {
      res.json(characters[i]);
      return;
    }
  }

  res.send("No character found");

} else {
  res.json(characters);
}
});

app.post("/api/new", function (req, res) {
  var newcharacter = req.body;
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

