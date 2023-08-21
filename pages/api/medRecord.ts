import type { NextApiRequest, NextApiResponse } from 'next';

import {
  deleteMedrecord,
  getMedrecords,
  postMedrecord
} from '@/src/utils/helpers/prisma/medRecord';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { uid, sort } = req.query;
    if (typeof uid === 'string' && typeof sort === 'string')
      try {
        const recordsResult = await getMedrecords({ uid, sort });
        res.status(200).json(recordsResult);
      } catch (error) {
        if (error instanceof Error) res.status(200).json({ error: error.message });
      }
  }

  if (req.method === 'POST') {
    try {
      const medrecordPostResult = await postMedrecord({ ...req.body });
      res.status(200).json(medrecordPostResult);
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (typeof id === 'string') {
        const medrecordDeleteResult = await deleteMedrecord(id);
        res.status(200).json(medrecordDeleteResult);
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
