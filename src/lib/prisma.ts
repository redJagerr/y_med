import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // eslint-disable-next-line prefer-const
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
