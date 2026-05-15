
import prisma from "../lib/prisma.js"
import 'dotenv/config'; 

async function generatePuzzle() {
    await prisma.dailyPuzzle.deleteMany()
    const castMembers = await prisma.castMember.findMany()

    let usedIDs = []

    const startDate = new Date()

    

    for (let i = 0; i < 365; i++) {

        if (usedIDs.length >= castMembers.length) {
            usedIDs = []
        }

        let date = new Date(startDate)
        date.setDate(date.getDate() + i)

        let pick
        do {
        pick = Math.floor(Math.random() * castMembers.length)
        } while (usedIDs.includes(pick))

        usedIDs.push(pick)
        const castMember = castMembers[pick]


        const newPuzzle = await prisma.dailyPuzzle.create({
            data: {
            castMemberId: castMember.id,
            date: date,
  },
        })

       

    }

     console.log("done")
}

generatePuzzle()