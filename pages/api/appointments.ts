import type { NextApiRequest, NextApiResponse } from 'next';

import {
  addAppoinment,
  changeAppointmentStatus,
  getAppointments
} from '@/src/utils/helpers/prisma/appointments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { uid, page } = req.query;
    try {
      if (typeof uid === 'string' && typeof page === 'string') {
        const appointments = await getAppointments(uid, page);
        const allAppointments = await getAppointments(uid);
        const pages = Math.ceil(allAppointments.length / 12);
        res.status(200).json({ appointments, pages });
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const result = await addAppoinment(req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    try {
      if (typeof id === 'string') {
        const result = await changeAppointmentStatus({ id: Number(id), status: req.body.status });
        res.status(200).json(result);
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
