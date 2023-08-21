import { Reviews } from '@prisma/client';

import prisma from '@/src/lib/prisma';

interface ChangeAverageRatingParams {
  doctorId: string;
  rating: number;
}
export const changeAverageRating = async ({ doctorId, rating }: ChangeAverageRatingParams) => {
  const reviews = await prisma.reviews.findMany({
    where: {
      doctorId
    }
  });

  const averageRating =
    reviews.length === 1
      ? rating
      : reviews.reduce(
          (commonRating: number, currentReview: Reviews) => commonRating + currentReview.rating,
          0
        ) / reviews.length;
  await prisma.doctors.update({
    where: {
      uid: doctorId
    },
    data: {
      averageRating: averageRating.toFixed(1)
    }
  });
};
