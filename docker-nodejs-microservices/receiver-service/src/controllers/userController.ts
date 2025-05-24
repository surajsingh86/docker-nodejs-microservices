import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';
import { publishMessage } from '../publisher';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRecord = {
      id: uuidv4(),
      ...req.body,
      inserted_at: new Date()
    };

    // Save to database
    const savedUser = await User.create(userRecord);

    // Publish to Redis
    await publishMessage('users', JSON.stringify(userRecord));

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error processing user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ inserted_at: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 