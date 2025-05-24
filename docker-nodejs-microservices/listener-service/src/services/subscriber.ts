import Redis from 'ioredis';
import { config } from '../config';
import { processUserData } from '../controllers/userController';
import { UserRecord } from '../types';

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port
});

export const startSubscriber = async () => {
  try {
    await redis.subscribe('users');
    console.log('Subscribed to users channel');

    redis.on('message', async (channel: string, message: string) => {
      if (channel === 'users') {
        try {
          const userData = JSON.parse(message) as UserRecord;
          await processUserData(userData);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }
    });
  } catch (error) {
    console.error('Redis subscription error:', error);
    throw error;
  }
}; 