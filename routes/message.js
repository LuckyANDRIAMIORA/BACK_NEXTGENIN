var express = require('express');
var router = express.Router();
const {messageQuery} = require('../prisma/dbQuery/dbQuery')


router.post('/messages/add', function(req, res, next) {
  let message = req.body;
  messageQuery.createMessage(message).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/messages', async function(req, res, next) {
  try {
    const data = await messageQuery.getMessages()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/messages/:id', async (req, res, next) => {
  const messageId = req.params.id;
  try {
    const data = await messageQuery.getOneMessage(messageId);
    res.json(data);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/messages/update/:id', async (req, res, next) => {
  const messageId = req.params.id
  const id = parseInt(messageId)
  const newDate = req.body
  try {
    const data = await messageQuery.updateMessage(newDate, id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/messages/delete/:id', async (req, res, next) => {
  const messageId = parseInt(req.params.id)
  try{
    const data = await messageQuery.deleteMessage(res, messageId)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})




module.exports = router;
