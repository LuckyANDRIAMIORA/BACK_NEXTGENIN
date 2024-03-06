var express = require('express');
var router = express.Router();
const {userQuery} = require('../prisma/dbQuery/dbQuery')

// Route pour l'inscription
router.post('/users/signup', async function (req, res, next) {
  let user = req.body
  userQuery.signup(user).then(() => {
    res.status(200).json({message : 'saved successfully'})
    res.end()
  }).catch((err)=>{
    next(err) // erreur transférer dans app.js
  })
});

//Route pour l'authentification
//Retourne le token
router.post('/users/login', async function (req, res, next){
  let user = req.body
  try {
    const data = await userQuery.login(user);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


//POST users
router.post('/users/add', function(req, res, next) {
  let user = req.body;
  userQuery.createUser(user).then(()=>{
    res.send(req.body)
    res.end() //Fin de la réponse
  }).catch((err)=>{
    next(err)
  })
});

router.get('/users', async function(req, res, next) {
  try {
    const data = await userQuery.getUsers()
    res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/users/:user_name', async (req, res, next) => {
  const userId = req.params.user_name;
  try {
    const data = await userQuery.getOneUser(userId);
    res.json(data);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/update/:id', async (req, res, next) => {
  const userId = req.params.id
  const id = parseInt(userId)
  const newDate = req.body; // Nouvelles données à mettre à jour pour l'utilisateur
  try {
    const data = await userQuery.updateUser(newDate, id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/users/delete/:id', async (req, res, next) => {
  const userId = parseInt(req.params.id)
  try{
    const data = await userQuery.deleteUser(res, userId)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})




module.exports = router;

