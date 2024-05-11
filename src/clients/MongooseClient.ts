import mongoose from 'mongoose';
import { $env } from '@config';

mongoose.set('strictQuery', false);
mongoose.set('runValidators', true);

if ($env.isDev || $env.isTest) {
  mongoose.set('debug', true);
}

mongoose.connection.on('connecting', () => {
  console.log('Connecting to MongoDB...');
});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});
mongoose.connection.on('open', function () {
  console.log('MongoDB connection opened!');
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});
mongoose.connection.on('close', function () {
  console.log('Connection to MongoDB is closed');
});
mongoose.connection.on('error', error => {
  console.error('Error connecting to MongoDB: ' + error);
});

export const MongooseClient = {
  connect: async () => {
    try {
      await mongoose.connect($env.DB_CONNECTION_STRING, {
        dbName: $env.DB_DATABASE,
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    return mongoose;
  },
  isConnected: () => Number(mongoose.connection.readyState) === 1,
};
