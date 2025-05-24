import { config } from './config';
import connectDB from './db/connection';
import { startSubscriber } from './services/subscriber';

const startServer = async () => {
  try {
    await connectDB();
    await startSubscriber();
    console.log('Listener service started successfully');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 