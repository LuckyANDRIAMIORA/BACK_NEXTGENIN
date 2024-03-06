var express = require('express');
var router = express.Router();
const {clubinterestQuery} = require('../prisma/dbQuery/dbQuery')


router.post('/clubinterests/add', function(req, res, next) {
  let clubinterest = req.body;
  clubinterestQuery.createClubinterest(clubinterest).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/clubinterests', async function(req, res, next) {
  try {
    const data = await clubinterestQuery.getClubInterests()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

module.exports = router;