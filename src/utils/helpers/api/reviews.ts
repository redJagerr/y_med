import { Reviews } from '@prisma/client';
import axios from 'axios';

export const getReviews = async (uid: string) => {
  const reviews = await axios(`https://ymed-4j4e.onrender.com/api/review?uid=${uid}`);
  return reviews.data;
};
export const addReview = async (data: Omit<Reviews, 'id'>) => {
  try {
    await axios.post('https://ymed-4j4e.onrender.com/api/review', data);
  } catch (error) {
    if (error instanceof Error) console.log(error);
  }
};
