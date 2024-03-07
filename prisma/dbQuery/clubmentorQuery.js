const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getClubMentors = async () =>{
    try {
        return await prisma.Clubmentor.findMany()
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createClubmentor = async (clubmentor) => { //et ca aussi est une fonction promise
    try {
        await prisma.Clubmentor.create({ // ce sont des fonctions promises
          data:{
            mentor: {
                connect: { id: clubmentor.mentorId }
            },
            club : {
                connect : { id : clubmentor.clubId}
            }
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

module.exports={getClubMentors,createClubmentor}