import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Comment.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
      },
      idPost: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
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
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      modelName: "Comment",
      sequelize,
      tableName: "comments",
    }
  );
  return Comment;
};
