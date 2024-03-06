const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getUserClubs = async () =>{
    try {
        return await prisma.Userclub.findMany();
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createUserClub = async (userclub) => { //et ca aussi est une fonction promise
    try {
        await prisma.Userclub.create({ // ce sont des fonctions promises
          data:{
            user : {
                connect : { id : userclub.userId}
            },
            club: {
                connect: { id: userclub.clubId }
            }
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

module.exports={getUserClubs,createUserClub}