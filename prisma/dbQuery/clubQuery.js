const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

let getClubs = async () =>{
    try {
        return await prisma.Club.findMany({});
        prisma.$disconnect()
    } catch (error) {
        prisma.$disconnect()
        throw new Error(error.message)
    }
}

let createClub = async (club) => { //et ca aussi est une fonction promise
    try {
        await prisma.Club.create({ // ce sont des fonctions promises
          data:{
            clubname: club.clubname,
            clubdescription : club.clubdescription
        }})
        prisma.$disconnect()     
    } catch (error) {
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
}

let updateClub = async (club, id) => {
    try {
        return await prisma.Club.update({
          where: {
            id: id,
          },
          data: 
          {
            clubname: club.clubname,
            clubdescription : club.clubdescription
          },
        });
        prisma.$disconnect() 
      } catch (error) {
        prisma.$disconnect()                  
        throw new Error(error.message)
      }
  }
  
  let deleteClub = async(res, id) => {
    try {
      const existingClub = await prisma.Club.findUnique({
        where: {
          id: id,
        },
      })
  
      if (!existingClub) {
        res.status(500).json({message: "Forum not found" })
        res.end()
      }
  
      await prisma.Club.delete({
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

  let getOneClub = async (id)=>{
    try {
        return await prisma.Club.findUnique({
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

  let getAllInterestOfClub = async (id) =>{
    try{
        return await prisma.Club.findUnique({
                where: {
                    id: id,
                },
                select: {
                interest: {
                    select: {
                        interestname: true
                    }
                }
                }
            });
    }catch(error){
        prisma.$disconnect()                   
        throw new Error(error.message)
    }
  }

module.exports={getClubs,createClub,updateClub,deleteClub,getOneClub}