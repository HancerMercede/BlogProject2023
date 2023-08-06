import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
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
      tableName: "users",
    }
  );
  return User;
};
