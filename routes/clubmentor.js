var express = require('express');
var router = express.Router();
const {clubmentorQuery} = require('../prisma/dbQuery/dbQuery')


router.post('/clubmentors/add', function(req, res, next) {
  let clubmentor = req.body;
  clubmentorQuery.createClubmentor(clubmentor).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/clubmentors', async function(req, res, next) {
  try {
    const data = await clubmentorQuery.getClubMentors()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

module.exports = router;