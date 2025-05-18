import { prisma } from "@/lib/prisma";

export async function createOrGetUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    const newUser = await prisma.user.create({
      data: { ulid: id, image: `/avatar/zoro.jpg` },
    });
    return newUser;
  }
  return user;
}

