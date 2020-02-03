//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const moods = require("./routes/moods");
const path = require("path");


//Initialize
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
// const db = require("./config/keys").mongoURI;
// Serve up static assets
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI  || "mongodb://localhost/moodi", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use('/routes/moods', moods);

//Serve static assets
if(process.env.NODE_ENV === 'production'){
  app.use(express.static("/client/build/"));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve( __dirname, 'client', 'build', 'index.html'))
  });
}

const port = process.env.PORT || 5000 ; // process.env.port is Heroku's port to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
