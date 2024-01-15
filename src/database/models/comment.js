import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../../Persistence/database.js";

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
    },
    idPost: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    commentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "Comment",
    sequelize,
    timestamps: true,
  }
);

export default Comment;
