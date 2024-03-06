var express = require('express');
var router = express.Router();
const {userclubQuery} = require('../prisma/dbQuery/dbQuery')


router.post('/userclubs/add', function(req, res, next) {
  let userclub = req.body;
  userclubQuery.createUserClub(userclub).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/userclubs', async function(req, res, next) {
  try {
    const data = await userclubQuery.getUserClubs()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

module.exports = router;