const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getForums = async () =>{
    try {
        return await prisma.Forum.findMany();
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createForum = async (forum) => { //et ca aussi est une fonction promise
    try {
        await prisma.Forum.create({ // ce sont des fonctions promises
          data:{
            forumname : forum.forumname,
            forumdescription : forum.forumdescription
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

let updateForum = async (forum, id) => {
    try {
        return await prisma.Forum.update({
          where: {
            id: id,
          },
          data: 
          {
            forumname : forum.forumname,
            forumdescription : forum.forumdescription
          },
        });
        prisma.$disconnect() 
      } catch (error) {
        prisma.$disconnect()                  
        throw new Error(error.message)
      }
  }
  
  let deleteForum = async(res, id) => {
    try {
      const existingForum = await prisma.Forum.findUnique({
        where: {
          id: id,
        },
      })
  
      if (!existingForum) {
        res.status(500).json({message: "Forum not found" })
        res.end()
      }
  
      await prisma.Forum.delete({
        where: {
          id: id,
        },
      })
      prisma.$disconnect()
      res.status(200).json({message: "Forum deleted" })
      res.end()
    } catch (error) {
      prisma.$disconnect()                  
      throw new Error(error.message)
    }
  }

  let getOneForum = async (id)=>{
    try {
        return await prisma.Forum.findUnique({
          where: {
            id: id,
          },
        });
        prisma.$disconnect() 
      } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
      }
  }

module.exports={getForums,createForum,updateForum,deleteForum,getOneForum}