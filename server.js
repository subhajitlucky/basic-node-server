//import express
const express = require("express");

//module for working with file and directory paths
const path = require("path");

//import body parser
const bodyParser = require("body-parser");

//import fs
const fs = require("fs");


//initializing express
const app = express();

//middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));

//serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

//define routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

//route to handle form submissions
app.post("/submit", (req, res) => {
  //extract the data from the request
  const { name, message } = req.body;
  const newEntry = { name, message, timeStamp: new Date() };

  //read the existing data
  fs.readFile("./data/message.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading file", err);
      res.status(500).send("<h1>Internal Server Error</h1>");
      return;
    }

    //parse the existing data and add the new entry
    const messages = JSON.parse(data);
    messages.push(newEntry);

    //write the updated data back to the file
    fs.writeFile(
      "./data/message.json",
      JSON.stringify(messages, null, 2),
      (err) => {
        if (err) {
          console.log("Error writing file", err);
          res.status(500).send("<h1>Internal Server Error</h1>");
          return;
        }
        res.send(`<h1>Thanks, ${name} , Your message has been received.</h1>`);
      }
    );
  });
});

//handle 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

//listen on port 3000
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
