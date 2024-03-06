const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{jwtDecode} = require('jwt-decode');
const {JWT_SECRET} = require('./../clé/cle')

// Middleware pour vérifier le JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');  
    console.log(token);
  
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end()
    }

    const decodedToken = jwtDecode(token)
    jwt.verify(token, JWT_SECRET, (err) => {
      req.userName = decodedToken.userName
      req.role = decodedToken.role
      console.log("....", req.userName)
      next();
    });
};

// Middleware pour autoriser uniquement les utilisateurs avec le rôle "admin"
function isAdmin(req, res, next) {
  console.log('....', req.role)
  if (req.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à accéder à cette ressource.' });
  }
}

module.exports={authenticateToken, isAdmin}
