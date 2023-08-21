import { Medcard_Record } from '@prisma/client';

import prisma from '@/src/lib/prisma';

interface GetMedrecordsParams {
  uid: string;
  sort: string;
}

export const getMedrecords = async ({ uid, sort }: GetMedrecordsParams) => {
  const options = sort !== 'all' ? { patientId: uid, type: sort } : { patientId: uid };

  const recordsResult = await prisma.medcard_Record.findMany({
    where: {
      ...options
    },
    orderBy: {
      date: 'desc'
    }
  });
  return recordsResult;
};

export const postMedrecord = async (data: Medcard_Record) => {
  const postResult = await prisma.medcard_Record.create({
    data
  });
  return postResult;
};
export const deleteMedrecord = async (id: string) => {
  const deleteResult = await prisma.medcard_Record.delete({
    where: {
      id
    }
  });
  return deleteResult;
};
