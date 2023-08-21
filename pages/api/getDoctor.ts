import type { NextApiRequest, NextApiResponse } from 'next';

import { getDoctor } from '@/src/utils/helpers/prisma/doctor';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { uid, type } = req.query;
    try {
      if (typeof uid === 'string' && typeof type === 'string') {
        const result = await getDoctor(uid, type);
        res.status(200).json(result);
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
