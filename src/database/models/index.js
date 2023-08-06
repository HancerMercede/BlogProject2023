import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import Sequelize, { DataTypes } from "sequelize";
import { env as _env } from "process";
const basename = _basename(__filename);
const env = _env.NODE_ENV || "development";
import dbConfig from "../../../config/config.js";

import Comment from "./comment.js";
import Post from "./post.js";
import User from "./user.js";

let config = dbConfig.development;

const db = {
  Comment,
  User,
  Post,
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

/* readdirSync("src/database/models")
  .filter((file) => {
    console.log(file)
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    return
    const model = require(join("./", file))(sequelize, DataTypes);
    db[model.name] = model;
  });
 */

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
