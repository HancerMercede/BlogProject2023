import User from "../database/models/user.js";

const UserService = {
  findAll: async (req, res, next) => {
    try {
      const user = await User.findAll();

      if (!user) return res.status(404).json({ message: "No user found" });

      return res.status(200).json(user);
    } catch (err) {
      next(err.message);
    }
  },

  findById: async (req, res, next, id) => {
    try {
      const user = await User.findByPk(id);

      if (!user) return res.status(404).json({ message: "No user found" });

      return res.status(200).json(user);
    } catch (err) {
      next(err.message);
    }
  },
};

export default UserService;
