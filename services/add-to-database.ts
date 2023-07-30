import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export async function addToDB(name: string, email: string, message: string) {
  await prisma.message.create({
    data: {
      name,
      email,
      message,
    },
  });
}
