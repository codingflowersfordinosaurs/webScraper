// DEPENDENCIES
let express = require("express");
let exphbs = require("express-handlebars");
let mongoose = require("mongoose");
let cheerio = require("cheerio");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let request = require("request");
let path = require("path");

// INITIALIZE EXPRESS
let app = express();
let PORT = process.env.PORT || 3000;
//let mongoUrl = "mongodb://localhost/mongoHeadlines";

// CONNECT HANDLEBARS TO EXPRESS APP
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// STATIC DIRECTORY FOR PUBLIC FOLDER
app.use(express.static(__dirname, "public"));

// USE MORGAN AND BODY PARSER
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MONGODB CONFIG DB
mongoose.connect(`mongodb://louielouie:D0ughd0ughnut5!@ds151086.mlab.com:51086/heroku_s2fqfqsb`);
let db = mongoose.connection;

// MONGOOSE ERRORS
db.on("error", function(err) {
  console.log("MONGOOSE ERROR: ", err);
});
// MONGOOSE CONNECTED
db.once("open", function() {
  console.log("Mongoose connected!");
});

// ROUTES TO SERVER
let routes = require("./config/routes");

// ROUTES FOR APP - need /, test, save, check, gather, fetch, delete
app.use("/", routes);
app.use("/test", routes);
app.use("/save", routes);
app.use("/delete", routes);
app.use("/fetch", routes);
app.use("/gather", routes);
app.use("/check", routes);

// LISTEN ON PORT
app.listen(PORT, function() {
  console.log(`App listening on http://localhost:${PORT}`);
});



