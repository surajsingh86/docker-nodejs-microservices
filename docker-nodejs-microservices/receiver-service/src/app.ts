import express from 'express';
import cors from 'cors';
import { config } from './config';
import connectDB from './db/connection';
import { connectRedis } from './publisher';
import userRoutes from './routes/userRoutes';

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    
    app.listen(port, () => {
      console.log(`Receiver service listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 