import { User } from '../models/User';
import { UserRecord } from '../types';

export const processUserData = async (userData: UserRecord): Promise<void> => {
  try {
    const userWithModifiedAt = {
      ...userData,
      modified_at: new Date()
    };

    const savedUser = await User.findOneAndUpdate(
      { id: userData.id },
      userWithModifiedAt,
      { upsert: true, new: true }
    );
    console.log('User data processed and saved:', savedUser);
  } catch (error) {
    console.error('Error processing user data:', error);
    throw error;
  }
}; 