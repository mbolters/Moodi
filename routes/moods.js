const router = require('express').Router();
let Mood = require('../models/mood');

router.route('/').get((req, res) => {
  Mood.find()
    .then(moods => res.json(moods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const mood = req.body.mood;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newMood = new Mood({
    name,
    mood,
    description,
    date,
  });

  newMood.save()
  .then(() => res.json('Mood added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Mood.findById(req.params.id)
    .then(mood => res.json(mood))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Mood.findByIdAndDelete(req.params.id)
    .then(() => res.json('Mood deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Mood.findById(req.params.id)
    .then(mood => {
      mood.name = req.body.name;
      mood.mood = req.body.mood;
      mood.description = req.body.description;
      mood.date = Date.parse(req.body.date);

      mood.save()
        .then(() => res.json('Mood updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;