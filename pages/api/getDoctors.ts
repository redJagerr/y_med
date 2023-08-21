import type { NextApiRequest, NextApiResponse } from 'next';

import { getDoctors } from '@/src/utils/helpers/prisma/doctors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sort, speciality, page } = req.query as Partial<{ [key: string]: string }>;
  if (req.method === 'GET') {
    try {
      if (typeof sort === 'string') {
        const doctors = await getDoctors({ page, speciality, sort });
        const allDoctors = await getDoctors({ speciality, sort });
        const pages = Math.ceil(allDoctors.length / 10);

        res.status(200).json({ doctors, pages });
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
