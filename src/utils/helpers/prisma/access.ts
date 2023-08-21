import prisma from '@/src/lib/prisma';

export const getAccessItem = async ({ patientId, doctorId }: { [key: string]: string }) => {
  const doctorsAccess = await prisma.medcard_Access.findMany({
    where: {
      doctorId,
      patientId
    }
  });
  return doctorsAccess[0];
};
export const updateAccess = async ({
  accessId,
  deadline
}: {
  accessId: number;
  deadline: Date;
}) => {
  const result = await prisma.medcard_Access.update({
    where: {
      id: accessId
    },
    data: {
      deadline
    }
  });
  return result;
};
