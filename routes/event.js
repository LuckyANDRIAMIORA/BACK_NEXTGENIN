var express = require('express');
var router = express.Router();
const {eventQuery} = require('../prisma/dbQuery/dbQuery')


router.post('/events/add', function(req, res, next) {
  let event = req.body;
  eventQuery.createEvent(event).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/events', async function(req, res, next) {
  try {
    const data = await eventQuery.getEvents()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});




module.exports = router;
