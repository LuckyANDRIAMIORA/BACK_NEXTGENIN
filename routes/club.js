var express = require('express');
var router = express.Router();
const {clubQuery} = require('../prisma/dbQuery/dbQuery')


router.post('/clubs/add', function(req, res, next) {
  let club = req.body;
  clubQuery.createClub(club).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/clubs', async function(req, res, next) {
  try {
    const data = await clubQuery.getClubs()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/club/interests/:id', async function(req, res, next) {
  const id = parseInt(req.params.id)
  try {
    const data = await clubQuery.getAllInterestOfClub(id)
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});





module.exports = router;
