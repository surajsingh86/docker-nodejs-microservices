import dotenv from 'dotenv';

dotenv.config();

export const config = {
  mongodb: {
    uri: 'mongodb://localhost:27017/listener'
  },
  redis: {
    host: 'localhost',
    port: 6379
  }
}; 