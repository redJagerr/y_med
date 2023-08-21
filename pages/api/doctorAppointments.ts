import type { NextApiRequest, NextApiResponse } from 'next';

import { getDoctorAppointments } from '@/src/utils/helpers/prisma/doctorAppointments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { uid, date } = req.query;
    try {
      if (typeof uid === 'string' && typeof date === 'string') {
        const appointments = await getDoctorAppointments({ uid, date });
        res.status(200).json(appointments);
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
