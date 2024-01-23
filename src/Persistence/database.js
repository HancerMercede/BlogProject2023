import { Sequelize } from "sequelize";
import { config } from "../database/config/config.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: config.development.dialect,
    host: config.development.host,
    port: config.development.port,
  }
);

const TestConection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
  } catch (error) {
    console.error("Unable to connect:", error);
  }
};

TestConection();

export default sequelize;
