import { Post } from "@prisma/client";
import { Context } from "../index";

interface PostArgs {
  title?: string;
  content?: string;
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    _: any,
    { title, content }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You must provide a title and content to create a post",
          },
        ],
        post: null,
      };
    }

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: 1,
      },
    });

    return {
      userErrors: [],
      post: post,
    };
  },

  postUpdate: async (
    _: any,
    { postId, post }: { postId: string; post: PostArgs },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: "Need to have atleast one field to update",
          },
        ],
        post: null,
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post does not exists",
          },
        ],
        post: null,
      };
    }

    const updatePayload = {
      title,
      content,
    };

    if (!title) {
      delete updatePayload.title;
    }

    if (!content) {
      delete updatePayload.content;
    }

    return {
      userErrors: [],
      post: await prisma.post.update({
        where: { id: Number(postId) },
        data: { ...updatePayload },
      }),
    };
  },

  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post does not exists",
          },
        ],
        post: null,
      };
    }

    await prisma.post.delete({ where: { id: Number(postId) } });

    return {
      userErrors: [],
      post: existingPost,
    };
  },
};
