import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  { host: process.env.PGHOST, dialect: 'postgres' }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connect.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();

export default sequelize;
