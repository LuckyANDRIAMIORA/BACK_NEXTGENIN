var express = require('express');
var router = express.Router();
const {interestQuery} = require('../prisma/dbQuery/dbQuery')

//POST forum
router.post('/interests/add', function(req, res, next) {
  let interest = req.body;
  interestQuery.createInterest(interest).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/interests', async function(req, res, next) {
  try {
    const data = await interestQuery.getInterests()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/interests/:id', async (req, res, next) => {
  const interestId = req.params.id;
  try {
    const data = await interestQuery.getOneInterest(interestId);
    res.json(data);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/interests/update/:id', async (req, res, next) => {
  const interestId = req.params.id
  const id = parseInt(interestId)
  const newDate = req.body
  try {
    const data = await interestQuery.updateInterest(newDate, id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/interests/delete/:id', async (req, res, next) => {
  const interestId = interestId(req.params.id)
  try{
    const data = await interestQuery.deleteInterest(res, interestId)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})




module.exports = router;
