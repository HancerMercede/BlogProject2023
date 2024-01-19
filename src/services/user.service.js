import User from "../database/models/user";

export const userService = {
  getAllUsers: async (req, res, nex) => {
    const users = await User.findAll();
  },

  getUserById: async (req, res, nex) => {},
};
