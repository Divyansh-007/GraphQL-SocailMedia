import { Context } from "..";

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: async (
    parent: ProfileParentType,
    __: any,
    { prisma, userInfo }: Context
  ) => {
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
