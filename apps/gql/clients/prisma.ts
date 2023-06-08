import { PrismaClient } from "@kampus-db/pano-prisma";

export function createPrismaClient() {
  const { DATABASE_URL, NODE_ENV } = process.env;

  const databaseUrl = new URL(DATABASE_URL as string);

  console.log(`🔌 setting up prisma client to ${databaseUrl.host}`);
  // NOTE: during development if you change anything in this function, remember
  // that this only runs once per server restart and won't automatically be
  // re-run per request like everything else is. So if you need to change
  // something in this file, you'll need to manually restart the server.
  const client = new PrismaClient({
    log: NODE_ENV === "development" ? ["query", "info", "warn", "error"] : [],
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });

  return client;
}
