import prisma from '@/src/lib/prisma';

import { defineSkipNumber } from '../defineSkipNumber';

interface GetDoctorsParams {
  speciality?: string;
  page?: string;
  sort: string;
}

export const getDoctors = async ({ speciality, page, sort }: GetDoctorsParams) => {
  const querySpecialityArgs =
    speciality && typeof speciality === 'string'
      ? {
          tags: {
            has: speciality
          }
        }
      : {};
  const paginationOptions = page
    ? {
        take: 10,
        skip: defineSkipNumber(page, 10)
      }
    : null;
  const doctors = await prisma.doctors.findMany({
    where: { ...querySpecialityArgs },
    orderBy: {
      [sort!]: 'desc'
    },
    include: {
      schedule: true,
      reviews: true,
      appointments: true
    },
    ...paginationOptions
  });
  return doctors;
};
