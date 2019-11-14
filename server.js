//pacakges
const mysql = require("mysql");

//star server
const express = require("express");

const server = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "student",
  database: "blog"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("MySQL is connected");
});

// Routes
server.get("/create-table", function(req, res) {
  console.log("hitting table route");
  let sql =
    "CREATE TABLE posts (ID int NOT NULL AUTO_INCREMENT, title varchar(255), body TEXT, PRIMARY KEY (ID));";
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.send("CREATED TABLE POST");
  });
});

// create a route that adds a post record
server.get("/post1", function(req, res) {
  console.log("hitting post route");
  let post = {
    title: "My first database encounter",
    body: "The teacher taught me how to do SQL injections judge"
  };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, function(err, result) {
    if (err) throw err;
    res.send("added first record to our posts table");
  });
});

// create a route that adds another post record
server.get("/post2", function(req, res) {
  console.log("hitting post route");
  let post = {
    title: "My second database encounter",
    body: "Amber alert, hope they find the kid"
  };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, function(err, result) {
    if (err) throw err;
    res.send("added second record to our posts table");
  });
});

// create a route that adds a delete post record 1

server.get("/delete_post/:id", function(req, res) {
  console.log(req.param.id);
  let sql = "DELETE FROM post WHERE ID=" + req.params.id;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.send("deleted a post");
  });
});

//listen for request
server.listen(3000, function() {
  console.log("server is live!");
});
