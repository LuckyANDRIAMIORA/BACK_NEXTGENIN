const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getEvents = async () =>{
    try {
        return await prisma.Event.findMany()
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createEvent = async (event) => { //et ca aussi est une fonction promise
    try {
        await prisma.Event.create({ // ce sont des fonctions promises
          data:{
            eventname : event.eventname,
            eventdescription : event.eventdescription,
            club : {
                connect : { id : event.clubId}
            }
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

module.exports={getEvents,createEvent}