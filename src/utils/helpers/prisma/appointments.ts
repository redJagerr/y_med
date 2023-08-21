import { Appointments } from '@prisma/client';

import prisma from '@/src/lib/prisma';

import { defineSkipNumber } from '../defineSkipNumber';

export const getAppointments = async (uid: string, page?: string) => {
  const paginationOptions = page
    ? {
        take: 12,
        skip: defineSkipNumber(page, 12)
      }
    : null;

  const result = await prisma.appointments.findMany({
    where: {
      patientId: uid
    },
    include: {
      doctor: true
    },
    orderBy: {
      time: 'desc'
    },
    ...paginationOptions
  });
  return result;
};
export const getUnconfirmedAppointments = async () => {
  const result = await prisma.appointments.findMany({
    where: {
      status: 'unconfirmed'
    },
    orderBy: {
      time: 'desc'
    },
    include: {
      patient: {
        select: {
          name: true,
          phone: true
        }
      },
      doctor: {
        select: {
          name: true
        }
      }
    }
  });
  return result;
};

export const addAppoinment = async (body: Appointments) => {
  const result = await prisma.appointments.create({
    data: {
      ...body
    }
  });
  return result;
};
export const changeAppointmentStatus = async ({ id, status }: { id: number; status: string }) => {
  const result = prisma.appointments.update({
    where: {
      id
    },
    data: {
      status
    }
  });
  return result;
};
