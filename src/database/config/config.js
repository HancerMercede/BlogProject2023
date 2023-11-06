export const config = {
  development: {
    username: "root",
    password: "M@r1a_db",
    database: "IT-MASTERS",
    host: "127.0.0.1",
    dialect: "mariadb",
    port: 3307,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: "root",
    password: "M@r1a_db",
    database: "it-masters",
    host: "127.0.0.1",
    dialect: "mariadb",
  },
  production: {
    username: "root",
    password: "M@r1a_db",
    database: "it-masters",
    host: "127.0.0.1",
    dialect: "mariadb",
  },
};
