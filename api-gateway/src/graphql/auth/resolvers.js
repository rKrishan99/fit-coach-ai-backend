import { registerUser, loginUser, requestPasswordReset, resetPassword, verifyToken } from "../../services/authService.js";

export const resolvers = {
  Query: {
    _: () => true,
    verifyToken: async (_, { token }) => {
      return await verifyToken(token);
    },
  },
  Mutation: {
    register: async (_, { email, password, name, profileImage, role }) => {
      return await registerUser(email, password, name, profileImage, role);
    },
    login: async (_, { email, password }) => await loginUser(email, password),
    requestPasswordReset: async (_, { email }) => await requestPasswordReset(email),
    resetPassword: async (_, { token, newPassword }) => await resetPassword(token, newPassword),
  },
}