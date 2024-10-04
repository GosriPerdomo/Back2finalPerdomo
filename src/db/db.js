const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const url = 'mongodb+srv://adminPerdomo:9whC4boovfV3wkG8@matiperdomo.qgguy.mongodb.net/test';  //  deje el link de mongo en la entrega 
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;



