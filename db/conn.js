import { Sequelize } from 'sequelize';
import 'dotenv/config';


const sq = new Sequelize(process.env.POSTGRES_URL) ;

const checkConnection = async () => {
    try {
        await sq.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkConnection();

export default sq;