import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: 3000,
  mongodb: {
    uri: 'mongodb://localhost:27017/receiver'
  },
  redis: {
    host: 'localhost',
    port: 6379
  }
}; 