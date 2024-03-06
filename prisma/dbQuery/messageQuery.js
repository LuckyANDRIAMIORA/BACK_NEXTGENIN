const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getMessages = async () =>{
    try {
        return await prisma.Message.findMany();
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createMessage = async (message) => { //et ca aussi est une fonction promise
    try {
        await prisma.Message.create({ // ce sont des fonctions promises
          data:{
            content : message.content,
            user: {
                connect: { id: message.userid }
            },
            forum : {
                connect : { id : message.forumid}
            }
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

let updateMessage = async (message, id) => {
    try {
        return await prisma.Message.update({
          where: {
            id: id,
          },
          data: 
          {
            content : message.content,
            user: {
                connect: { id: message.userid }
            },
            forum : {
                connect : { id : message.forumid}
            }
          },
        });
        prisma.$disconnect() 
      } catch (error) {
        prisma.$disconnect()                  
        throw new Error(error.message)
      }
  }
  
  let deleteMessage = async(res, id) => {
    try {
      const existingMessage = await prisma.Message.findUnique({
        where: {
          id: id,
        },
      })
  
      if (!existingMessage) {
        res.status(500).json({message: "Message not found" })
        res.end()
      }
  
      await prisma.Message.delete({
        where: {
          id: id,
        },
      })
      prisma.$disconnect()
      res.status(200).json({message: "Message deleted" })
      res.end()
    } catch (error) {
      prisma.$disconnect()                  
      throw new Error(error.message)
    }
  }

  let getOneMessage = async (id)=>{
    try {
        return await prisma.Message.findUnique({
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

module.exports={getMessages,createMessage,updateMessage,deleteMessage,getOneMessage}