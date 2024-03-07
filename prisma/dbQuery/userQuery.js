const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {JWT_SECRET} = require('../../clé/cle.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let getUsers = async () => {
    try {
        return await prisma.User.findMany();
        prisma.$disconnect() // fermer la connexion à la base de données 
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createUser = async (user) => {
    try {
        await prisma.User.create({
          data:{
            username : user.username,
            name : user.name,
            firstname : user.firstname,
            mail : user.mail,
            facebooklink : user.facebooklink,
            role : user.role,
            password: user.password
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

let getOneUser = async (user_name)=>{
  try {
      return await prisma.User.findUnique({
        where: {
          username: user_name,
        },
      });
      prisma.$disconnect() 
    } catch (error) {
      prisma.$disconnect()                   
      throw new Error(error.message)
    }
}

let updateUser = async (user, id) => {
  try {
      return await prisma.User.update({
        where: {
          id: id,
        },
        data: 
        {
          username : user.username,
          name : user.name,
          firstname : user.firstname,
          mail : user.mail,
          facebooklink : user.facebooklink,
          role : user.role,
          password: user.user_password
        },
      });
      prisma.$disconnect() 
    } catch (error) {
      prisma.$disconnect()                  
      throw new Error(error.message)
    }
}

let deleteUser = async(res, id) => {
  try {
    const existingUser = await prisma.User.findUnique({
      where: {
        id: id,
      },
    })

    if (!existingUser) {
      res.status(500).json({message: "User not found" })
      res.end()
    }

    // Supprimez l'utilisateur
    await prisma.User.delete({
      where: {
        id: id,
      },
    })
    prisma.$disconnect()
    res.status(200).json({message: "User deleted" })
    res.end()
  } catch (error) {
    prisma.$disconnect()                  
    throw new Error(error.message)
  }
}

let signup = async (user) =>{
  const hashedPassword = await bcrypt.hash(user.password, 10);
   try {
    await prisma.User.create({
      data: {
        username : user.username,
        name : user.name,
        firstname : user.firstname,
        mail : user.mail,
        facebooklink : user.facebooklink,
        role : user.role,
        password: hashedPassword
    }})
    prisma.$disconnect()
  } catch (error) {
    prisma.$disconnect()                   
    throw new Error(error.message)
  }
}

let login = async (user) =>{
  const {username, name, firstname, mail, facebooklink, role, password} = user

  var res = {}

  const userFound = await prisma.User.findUnique({
     where: { username } 
  })

  if (!userFound) {
    res = { error: 'User not found' };
    return res
  }

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) {
    res = { error: 'Incorrect password' };
    return res
  }
  // Générer le JWT
  const token = jwt.sign({ 
    userName: userFound.username, role : userFound.role }, 
    JWT_SECRET, 
    { expiresIn: '1m' 
  });
  res = { token };
  return res
}


let getUserInterests  = async (id) =>{
  try{
    return await prisma.User.findUnique({
        where: {
            id: id,
            role:"utilisateur"
        },
        include: {
          interests: true
        }
    });
  }catch(error){
      prisma.$disconnect()                   
      throw new Error(error.message)
  }
}


module.exports={
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  signup,
  login,
  getUserInterests
}