import dayjs from 'dayjs';

import prisma from '@/src/lib/prisma';

interface GetDoctorAppointmentsParams {
  uid: string;
  date: string;
}

export const getDoctorAppointments = async ({ uid, date }: GetDoctorAppointmentsParams) => {
  const nextday = dayjs(Number(date)).add(1, 'day').valueOf();
  const result = prisma.appointments.findMany({
    where: {
      doctorId: uid,
      time: {
        gte: new Date(Number(date)),
        lt: new Date(nextday)
      },
      NOT: {
        status: 'completed'
      }
    },
    include: {
      patient: true
    }
  });
  return result;
};
