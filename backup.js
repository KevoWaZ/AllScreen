const { PrismaClient } = require("@prisma/client");
const { PrismaBackup } = require("@vorlefan/prisma-backup");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting backup...");
  const backup = new PrismaBackup(prisma, {
    folderName: ".db_backups",
    database: "postgres",
  });
  await backup.run();
  console.log("✅ Backup completed!");
}

main();
