import type { NextApiRequest, NextApiResponse } from 'next';

import { addUser, getUser } from '@/src/utils/helpers/prisma/user';
import { UserType } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid, type } = req.query;

  if (req.method === 'GET') {
    try {
      if (typeof uid === 'string' && typeof type === 'string') {
        console.log('before');
        const result = await getUser(uid, type as UserType);
        console.log('after', result);
        res.status(200).json(result);
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const result = await addUser(type as UserType, req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
