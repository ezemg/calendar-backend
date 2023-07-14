const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de conectar a la DB');
  }
};

module.exports = { dbConnection };
