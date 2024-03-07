const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getMentors = async () =>{
    try {
        return await prisma.Mentor.findMany()
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createMentor = async (mentor) => { //et ca aussi est une fonction promise
    try {
        await prisma.Mentor.create({ // ce sont des fonctions promises
          data:{
            namementor : mentor.namementor
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

let getAllClubofMentors = async (id) =>{
    try{
      return await prisma.Mentor.findUnique({
          where: {
              id: id,
          },
          include: {
            club : {
                include : {
                    club:true
                }
            }
          }
      });
    }catch(error){
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
  }


module.exports={getMentors,createMentor,getAllClubofMentors}