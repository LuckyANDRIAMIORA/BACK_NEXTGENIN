const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getInterests = async () =>{
    try {
        return await prisma.Interest.findMany({});
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createInterest = async (interest) => { //et ca aussi est une fonction promise
    try {
        await prisma.Interest.create({ // ce sont des fonctions promises
          data:{
            interestname : interest.interestname
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

let updateInterest = async (interest, id) => {
    try {
        return await prisma.Interest.update({
          where: {
            id: id,
          },
          data: 
          {
            interestname : interest.interestname
          },
        });
        prisma.$disconnect() 
      } catch (error) {
        prisma.$disconnect()                  
        throw new Error(error.message)
      }
  }
  
  let deleteInterest = async(res, id) => {
    try {
      const existingInterest = await prisma.Interest.findUnique({
        where: {
          id: id,
        },
      })
  
      if (!existingInterest) {
        res.status(500).json({message: "Forum not found" })
        res.end()
      }
  
      await prisma.Interest.delete({
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

  let getOneInterest = async (id)=>{
    try {
        return await prisma.Interest.findUnique({
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

module.exports={getInterests,createInterest,updateInterest,deleteInterest,getOneInterest}