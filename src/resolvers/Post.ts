import { Context } from "..";
import { userLoader } from "../loaders/userLoader";

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: async (parent: PostParentType, __: any, { prisma }: Context) => {
    userLoader.load(parent.authorId);
    // return prisma.user.findUnique({
    //   where: {
    //     id: parent.authorId,
    //   },
    // });
  },
};
