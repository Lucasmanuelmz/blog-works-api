const {Sequelize} = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.UESER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.LOCAL_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    timezone: '+02:00',
    logging: false
  }
)
async function testingDatabase() {
  try {
    sequelize.authenticate();
    console.log('Connectado ao banco de dados')
  }catch (error) {
   console.log('Nao esta sendo possivel se connectar ao banco de dados')
  }
}
testingDatabase()
module.exports = sequelize;