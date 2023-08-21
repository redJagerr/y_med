import prisma from '@/src/lib/prisma';

export const getReviews = async (uid: string) => {
  const reviewsResult = await prisma.reviews.findMany({
    where: {
      patientId: uid
    },
    include: {
      patient: true
    }
  });
  return reviewsResult;
};
