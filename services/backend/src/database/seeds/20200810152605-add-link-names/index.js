const path = require("path");
const prisma = require("../..");

const linkAttachmentNames = require("./data/linkAttachmentNames");

async function seedStaticInfo() {
  const staticInfo = [
    ...linkAttachmentNames.map(async ({ en, fr, type }) => {
      await prisma.opAttachmentLinkName.create({
        data: {
          type,
          translations: {
            create: [
              {
                name: en,
                language: "ENGLISH",
              },
              {
                name: fr,
                language: "FRENCH",
              },
            ],
          },
        },
      });
    }),
  ];
  return Promise.all(staticInfo);
}

async function seed() {
  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeed.findOne({
    where: { id: folderName },
  });

  if (!dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedStaticInfo();
    await prisma.dbSeed.create({
      data: {
        id: folderName,
      },
    });
    console.log(`---- Finished seeding: ${folderName} ----\n`);
  }

  await prisma.$disconnect();
}

module.exports = seed;
