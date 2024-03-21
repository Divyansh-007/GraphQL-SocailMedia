import { Context } from "..";

export const Query = {
  me: async (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) {
      return null;
    }

    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },

  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma }: Context
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return null;
    }

    return prisma.profile.findUnique({
      where: { userId: user.id },
    });
  },

  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
