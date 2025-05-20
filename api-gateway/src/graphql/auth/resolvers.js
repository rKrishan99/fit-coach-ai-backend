import { registerUser, loginUser } from "../../services/authService.js";

export const resolvers = {
  Mutation: {
    register: async (_, { email, password, name, profileImage, role }) => {
      return await registerUser(email, password, name, profileImage, role);
    },
    login: async (_, { email, password }) => await loginUser(email, password),
  },
}