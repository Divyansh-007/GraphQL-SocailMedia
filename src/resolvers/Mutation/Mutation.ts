import { PostResolvers } from "./Post";
import { AuthResolvers } from "./Auth";

export const Mutation = {
  ...PostResolvers,
  ...AuthResolvers,
};
