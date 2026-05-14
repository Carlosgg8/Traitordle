import prisma from "../lib/prisma.js"

async function main() {
  console.log("Connected to Prisma")

  const countryData = [
  { number: 1, country: "us", year: 2023 },
  { number: 2, country: "us", year: 2024 },
  { number: 3, country: "us", year: 2025 },
  { number: 4, country: "us", year: 2026 },
];

for (const season of countryData) {
  const existing = await prisma.season.findFirst({
    where: { number: season.number, country: season.country }
  })

  if (existing) {
    await prisma.season.update({
      where: { id: existing.id },
      update: { year: season.year }
    })
  } else {
    await prisma.season.create({
      data: {
        number: season.number,
        country: season.country,
        year: season.year
      }
    })
  }
}

const castMembers = [
  {
    "name": "Cirie Fields",
    "age": 51,
    "placement": 1,
    "isTraitor": "TRUE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Quentin Jiles",
    "age": 32,
    "placement": 2,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Andie Vanacore",
    "age": 30,
    "placement": 2,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Arie Luyendyk Jr.",
    "age": 40,
    "placement": 4,
    "isTraitor": "TRUE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Kate Chastain",
    "age": 39,
    "placement": 5,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Christian de la Torre",
    "age": 28,
    "placement": 6,
    "isTraitor": "TRUE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Stephenie LaGrossa",
    "age": 42,
    "placement": 6,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Rachel Reilly",
    "age": 37,
    "placement": 8,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Shelbe Rodriguez",
    "age": 31,
    "placement": 9,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Anjelica Conti",
    "age": 28,
    "placement": 10,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Cody Calafiore",
    "age": 32,
    "placement": 11,
    "isTraitor": "TRUE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Amanda Clark-Stoner",
    "age": 30,
    "placement": 12,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Kyle Cooke",
    "age": 39,
    "placement": 12,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Ryan Lochte",
    "age": 37,
    "placement": 14,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Michael Davidson",
    "age": 35,
    "placement": 14,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Azra Valani",
    "age": 35,
    "placement": 14,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Brandi Glanville",
    "age": 49,
    "placement": 17,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Robert Nieves",
    "age": 33,
    "placement": 18,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Geraldine Moreno",
    "age": 29,
    "placement": 19,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Reza Farahan",
    "age": 48,
    "placement": 20,
    "isTraitor": "FALSE",
    "seasonNumber": 1,
    "country": "us"
  },
  {
    "name": "Trishelle Cannatella",
    "age": 43,
    "placement": 1,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "CT Tamburello",
    "age": 43,
    "placement": 1,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "MJ Javid",
    "age": 51,
    "placement": 3,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Sandra Diaz-Twine",
    "age": 49,
    "placement": 3,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Kate Chastain",
    "age": 40,
    "placement": 3,
    "isTraitor": "TRUE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Sheree Whitfield",
    "age": 53,
    "placement": 3,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Phaedra Parks",
    "age": 49,
    "placement": 7,
    "isTraitor": "TRUE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "John Bercow",
    "age": 60,
    "placement": 7,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Peter Weber",
    "age": 32,
    "placement": 9,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Kevin Kreider",
    "age": 40,
    "placement": 9,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Parvati Shallow",
    "age": 40,
    "placement": 11,
    "isTraitor": "TRUE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Bergie Bergersen",
    "age": 24,
    "placement": 11,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Dan Gheesling",
    "age": 40,
    "placement": 13,
    "isTraitor": "TRUE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Janelle Pierzina",
    "age": 43,
    "placement": 13,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Tamra Judge",
    "age": 56,
    "placement": 15,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Larsa Pippen",
    "age": 49,
    "placement": 15,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Ekin-Su Culculoglu",
    "age": 29,
    "placement": 15,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Deontay Wilder",
    "age": 37,
    "placement": 18,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Maks Chmerkovskiy",
    "age": 43,
    "placement": 19,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Marcus Jordan",
    "age": 32,
    "placement": 20,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Peppermint",
    "age": 43,
    "placement": 21,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Johnny Bananas",
    "age": 41,
    "placement": 21,
    "isTraitor": "FALSE",
    "seasonNumber": 2,
    "country": "us"
  },
  {
    "name": "Dolores Catania",
    "age": 52,
    "placement": 1,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Dylan Efron",
    "age": 32,
    "placement": 1,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Ivar Mountbatten",
    "age": 61,
    "placement": 1,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Gabby Windey",
    "age": 33,
    "placement": 1,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Danielle Reyes",
    "age": 52,
    "placement": 5,
    "isTraitor": "TRUE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Britney Haynes",
    "age": 36,
    "placement": 5,
    "isTraitor": "TRUE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Tom Sandoval",
    "age": 41,
    "placement": 7,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Carolyn Wiger",
    "age": 37,
    "placement": 8,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Sam Asghari",
    "age": 30,
    "placement": 8,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Ciara Miller",
    "age": 28,
    "placement": 10,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Chrishell Stause",
    "age": 42,
    "placement": 10,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Rob Mariano",
    "age": 48,
    "placement": 12,
    "isTraitor": "TRUE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Derrick Levasseur",
    "age": 40,
    "placement": 12,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Wes Bergmann",
    "age": 39,
    "placement": 14,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Bob Harper",
    "age": 58,
    "placement": 14,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Nikki Garcia",
    "age": 40,
    "placement": 16,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Robyn Dixon",
    "age": 45,
    "placement": 16,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Bob the Drag Queen",
    "age": 37,
    "placement": 18,
    "isTraitor": "TRUE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Jeremy Collins",
    "age": 46,
    "placement": 18,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Tony Vlachos",
    "age": 50,
    "placement": 20,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Chanel Ayan",
    "age": 45,
    "placement": 20,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Wells Adams",
    "age": 40,
    "placement": 22,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Dorinda Medley",
    "age": 59,
    "placement": 22,
    "isTraitor": "FALSE",
    "seasonNumber": 3,
    "country": "us"
  },
  {
    "name": "Rob Rausch",
    "age": 26,
    "placement": 1,
    "isTraitor": "TRUE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Maura Higgins",
    "age": 34,
    "placement": 2,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Eric Nam",
    "age": 36,
    "placement": 3,
    "isTraitor": "TRUE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Tara Lipinski",
    "age": 43,
    "placement": 3,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Johnny Weir",
    "age": 40,
    "placement": 3,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Mark Ballas",
    "age": 39,
    "placement": 6,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Natalie Anderson",
    "age": 39,
    "placement": 7,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Kristen Kish",
    "age": 41,
    "placement": 7,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Stephen Colletti",
    "age": 39,
    "placement": 9,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Dorinda Medley",
    "age": 60,
    "placement": 9,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Candiace Dillard Bassett",
    "age": 38,
    "placement": 11,
    "isTraitor": "TRUE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Colton Underwood",
    "age": 33,
    "placement": 11,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Lisa Rinna",
    "age": 61,
    "placement": 13,
    "isTraitor": "TRUE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Yam Yam Arocho",
    "age": 38,
    "placement": 13,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Ron Funches",
    "age": 42,
    "placement": 15,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Michael Rapaport",
    "age": 55,
    "placement": 16,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Monet X Change",
    "age": 35,
    "placement": 16,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Tiffany Mitchell",
    "age": 44,
    "placement": 18,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Caroline Stanbury",
    "age": 49,
    "placement": 18,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Donna Kelce",
    "age": 72,
    "placement": 20,
    "isTraitor": "TRUE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Rob Cesternino",
    "age": 46,
    "placement": 20,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Porsha Williams",
    "age": 43,
    "placement": 22,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  },
  {
    "name": "Ian Terry",
    "age": 34,
    "placement": 22,
    "isTraitor": "FALSE",
    "seasonNumber": 4,
    "country": "us"
  }
]

const fixedCastMembers = castMembers.map(c => ({
  ...c,
  isTraitor: c.isTraitor === "TRUE"
}))

for (const member of fixedCastMembers) {
  const season = await prisma.season.findFirst({
    where: {
      number: member.seasonNumber,
      country: member.country
    }
  })

  await prisma.castMember.upsert({
    where: {
      name_seasonId: {
        name: member.name,
        seasonId: season.id
      }
    },
    update: {
      age: member.age,
      placement: member.placement,
      isTraitor: member.isTraitor
    },
    create: {
      name: member.name,
      age: member.age,
      placement: member.placement,
      isTraitor: member.isTraitor,
      seasonId: season.id
    }
  })
}

console.log("Seeded all cast members!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())