import { PrismaClient }  from  '@prisma/client'



//init the client 
const prisma =new PrismaClient()


async function main() {
  // to create allUsers
   await prisma.user.create({ 
    data: { 
       name: 'Aditya',
       email: 'aditya@prisma.io',
       posts: { 
       create:{ 
       title: 'Hello World to PrismaClient'},
    },
    profile:{ 
       create: { bio:'I like programming'}
    },

    },
  })
   const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    }
  })
  console.dir(allUsers,{depth: null});
  
}



main().then(async ()=>{ 
   await prisma.$disconnect()
})
.catch(async(e)=>{ 
    console.log("Error in connecting PrismaClient" + e);
    await prisma.$disconnect()
    process.exit(1)
})
