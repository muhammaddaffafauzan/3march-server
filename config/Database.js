import { Sequelize } from "sequelize";

const db = new Sequelize('3march_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;