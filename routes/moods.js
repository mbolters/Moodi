const router = require('express').Router();
let Mood = require('../models/Mood');

//username passed thorugh /moods/username
router.route('/:username').get((req, res) => {
  //find moods by username
  Mood.find({username: req.params.username})
    .then(moods => res.json(moods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log(req.body);
  
  const name = req.body.name;
  const username = req.body.username;
  const mood = req.body.mood;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const morning = req.body.morning;

  const newMood = new Mood({
    name,
    username,
    mood,
    description,
    date,
    morning
  });

  newMood.save()
  .then(() => res.json({message: 'Mood added!'}))
  .catch(err => res.status(400).json({message: 'Error: ' + err}));
});

router.route('/:username').get((req, res) => {
  Mood.find({ username: req.params.username })
    .then(mood => res.json(mood)) 
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/davishochs').get((req, res) => {
  // const username = req.params.id
  Mood.find({ username: "davishochs"})
    .then(moods => {res.json({moods})}) 
    .catch(err => res.status(400).json('Error: ' + err));
});

//words.filter(word => word.length > 6);
// User.find({}, function(err, users) {
//   var userMap = {};
//   users.forEach(function(user) {
//     userMap[user._id] = user;
//   });
//   res.send(userMap);  
// });
router.route('/:id').delete((req, res) => {
  Mood.findByIdAndDelete(req.params.id)
    .then(() => res.json('Mood deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Mood.findById(req.params.id)
    .then(mood => {
      console.log(mood)
      mood.mood = req.body.mood;
      mood.description = req.body.description;

      mood.save()
        .then(() => res.json('Mood updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;