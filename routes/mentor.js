var express = require('express');
var router = express.Router();
const {mentorQuery} = require('../prisma/dbQuery/dbQuery')


router.post('/mentors/add', function(req, res, next) {
  let mentor = req.body;
  mentorQuery.createMentor(mentor).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/mentors', async function(req, res, next) {
  try {
    const data = await mentorQuery.getMentors()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

module.exports = router;