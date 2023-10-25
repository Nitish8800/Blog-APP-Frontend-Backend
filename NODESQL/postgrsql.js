import { Sequelize } from "sequelize";

const connection = () => {
  const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "postgres",
  });
};
