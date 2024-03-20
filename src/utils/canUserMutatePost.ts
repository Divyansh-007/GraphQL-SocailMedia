import { Context } from "..";

interface CanUserMutatePostArgs {
  userId: number;
  postId: number;
  prisma: Context["prisma"];
}

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: CanUserMutatePostArgs) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return {
      userErrors: [
        {
          message: "Post not found",
        },
      ],
      post: null,
    };
  }

  if (post?.authorId !== userId) {
    return {
      userErrors: [
        {
          message: "Post not owned by user",
        },
      ],
      post: null,
    };
  }
};
