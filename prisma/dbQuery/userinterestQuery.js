const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getUserInterests = async () =>{
    try {
        return await prisma.UserInterest.findMany();
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createUserInterest = async (userinterest) => { //et ca aussi est une fonction promise
    try {
        await prisma.UserInterest.create({ // ce sont des fonctions promises
          data:{
            user : {
                connect : { id : userinterest.userId}
            },
            interest: {
                connect: { id: userinterest.interestId }
            }
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

module.exports={getUserInterests,createUserInterest}