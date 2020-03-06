//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const moods = require("./routes/moods");
const index = require("./routes/index")


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
const db = "mongodb://localhost:27017"
// Serve up static assets
// Connect to MongoDB
// mongoose.connect("mongodb+srv://davishochs:Davisray01@cluster0-i1mpu.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose
  .connect(process.env.MONGODB_URI || db, {useNewUrlParser: true})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  

// Passport middleware
app.use(passport.initialize());

// if (process.env.NODE_ENV === 'production') {
//   // Exprees will serve up production assets
//   app.use(express.static('client/build'));

//   // Express serve up index.html file if it doesn't recognize route
//   const path = require('path');
//   app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use('/moods', moods);
app.use('/', index);

const port = process.env.PORT || 5000 ; // process.env.port is Heroku's port to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
