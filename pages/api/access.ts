import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/src/lib/prisma';
import { getAccessItem, updateAccess } from '@/src/utils/helpers/prisma/access';

const checkDeadlineExpired = (deadline: Date) => dayjs(deadline).valueOf() > Date.now();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { patientId, doctorId } = req.query;
    try {
      if (typeof patientId === 'string' && typeof doctorId === 'string') {
        const doctorsAccess = await getAccessItem({ patientId, doctorId });
        const accessCheck = doctorsAccess ? checkDeadlineExpired(doctorsAccess.deadline) : false;
        res.status(200).json({ isAccess: accessCheck });
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { patientId, doctorId, deadline } = req.body;
      const doctorAccess = await getAccessItem({ patientId, doctorId });

      if (doctorAccess) {
        if (checkDeadlineExpired(doctorAccess.deadline))
          throw Error('Вы уже давали доступ этому врачу');
        else {
          const medcardAccessUpdateResult = updateAccess({ accessId: doctorAccess.id, deadline });
          res.status(200).json({ medcardAccessUpdateResult, message: 'updated' });
        }
      } else {
        const medcardAccessPostResult = await prisma.medcard_Access.create({
          data: {
            ...req.body
          }
        });
        res.status(200).json(medcardAccessPostResult);
      }
    } catch (error) {
      if (error instanceof Error) res.status(200).json({ error: error.message });
    }
  }
}
