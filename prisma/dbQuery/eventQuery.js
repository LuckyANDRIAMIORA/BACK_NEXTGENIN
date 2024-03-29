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
            eventdate : event.eventdate,
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

let deleteEvent = async(res, id) => {
    try {
      const existingEvent = await prisma.Event.findUnique({
        where: {
          id: id,
        },
      })
  
      if (!existingEvent) {
        res.status(500).json({message: "Event not found" })
        res.end()
      }
  
      await prisma.Event.delete({
        where: {
          id: id,
        },
      })
      prisma.$disconnect()
      res.status(200).json({message: "Event deleted" })
      res.end()
    } catch (error) {
      prisma.$disconnect()                  
      throw new Error(error.message)
    }
  }

module.exports={getEvents,createEvent,deleteEvent}