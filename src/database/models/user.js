import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../../Persistence/database.js";
import Post from "./post.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: UUIDV4 },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    salt: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);
export default User;
