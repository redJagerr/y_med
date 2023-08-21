import prisma from '@/src/lib/prisma';

export const getDoctor = async (uid: string, type: string) => {
  const pickIncludeFields = (includeType: string) => {
    switch (includeType) {
      case 'info':
        return {
          education: true,
          expirience: true
        };
      case 'appointment':
        return {
          schedule: true,
          appointments: true
        };
      case 'reviews':
        return {
          reviews: {
            include: {
              patient: {
                select: {
                  name: true
                }
              }
            }
          }
        };
      default:
        break;
    }
  };
  const includeFields = pickIncludeFields(type);
  const doctor = await prisma.doctors.findUnique({
    where: {
      uid
    },
    include: includeFields
  });
  return doctor;
};
