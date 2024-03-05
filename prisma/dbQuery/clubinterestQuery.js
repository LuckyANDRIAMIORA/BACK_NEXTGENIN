const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getClubInterests = async () =>{
    try {
        return await prisma.clubinterest.findMany();
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createClubinterest = async (clubinterest) => { //et ca aussi est une fonction promise
    try {
        await prisma.clubinterest.create({ // ce sont des fonctions promises
          data:{
            interest: {
                connect: { id: clubinterest.interestId }
            },
            club : {
                connect : { id : clubinterest.clubId}
            }
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

module.exports={getClubInterests,createClubinterest}