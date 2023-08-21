import type { NextApiRequest, NextApiResponse } from 'next';

import { getUnconfirmedAppointments } from '@/src/utils/helpers/prisma/appointments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const appointments = await getUnconfirmedAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
