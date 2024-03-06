var express = require('express');
var router = express.Router();
const {forumQuery} = require('../prisma/dbQuery/dbQuery')

//POST forum
router.post('/forums/add', function(req, res, next) {
  let forum = req.body;
  forumQuery.createForum(forum).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/forums', async function(req, res, next) {
  try {
    const data = await forumQuery.getForums()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/forums/:id', async (req, res, next) => {
  const forumId = req.params.id;
  try {
    const data = await forumQuery.getOneForum(forumId);
    res.json(data);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/forums/update/:id', async (req, res, next) => {
  const forumId = req.params.id
  const id = parseInt(forumId)
  const newDate = req.body
  try {
    const data = await forumQuery.updateForum(newDate, id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/forums/delete/:id', async (req, res, next) => {
  const forumId = parseInt(req.params.id)
  try{
    const data = await forumQuery.deleteForum(res, forumId)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})




module.exports = router;
