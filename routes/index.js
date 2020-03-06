const router = require('express').Router();
const path = require('path');
const express = require("express");
const app = express();



router.route('/').get((req, res) => {
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
});



module.exports = router;