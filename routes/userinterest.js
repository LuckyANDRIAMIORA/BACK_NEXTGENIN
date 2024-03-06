var express = require('express');
var router = express.Router();
const {userinterestQuery} = require('../prisma/dbQuery/dbQuery')


router.post('/userinterests/add', function(req, res, next) {
  let userinterest = req.body;
  userinterestQuery.createUserInterest(userinterest).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/userinterests', async function(req, res, next) {
  try {
    const data = await userinterestQuery.getUserInterests()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

module.exports = router;