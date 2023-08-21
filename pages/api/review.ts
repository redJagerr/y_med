import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/src/lib/prisma';
import { changeAverageRating } from '@/src/utils/helpers/prisma/changeAverageRating';
import { getReviews } from '@/src/utils/helpers/prisma/review';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { uid } = req.query;
    if (typeof uid === 'string')
      try {
        const reviewsResult = await getReviews(uid);
        res.status(200).json(reviewsResult);
      } catch (error) {
        if (error instanceof Error) res.status(200).json({ error: error.message });
      }
  }

  if (req.method === 'POST') {
    const { doctorId, rating } = req.body;
    try {
      const reviewPostResult = await prisma.reviews.create({
        data: {
          ...req.body
        }
      });
      await changeAverageRating({ doctorId, rating });
      res.status(200).json(reviewPostResult);
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
