import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize("it-masters","root","M@r1a_db", {
    dialect:'mariadb',
    host:'localhost',
    port:3307
});


const TestConection = async () => {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

TestConection();

export default sequelize;