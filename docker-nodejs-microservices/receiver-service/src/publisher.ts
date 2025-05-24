import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.on('error', (err: Error) => console.error('Redis Client Error:', err));

export const connectRedis = async () => {
  await redisClient.connect();
  console.log('Redis publisher connected successfully');
};

export const publishMessage = async (channel: string, message: string) => {
  try {
    await redisClient.publish(channel, message);
    console.log(`Message published to channel ${channel}`);
  } catch (error) {
    console.error('Error publishing message:', error);
    throw error;
  }
}; 