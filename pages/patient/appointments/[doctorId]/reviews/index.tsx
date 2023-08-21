import { Doctors, Patient, Reviews } from '@prisma/client';
import { GetServerSideProps } from 'next';

import DoctorLayout from '@/layouts/doctorPage/[doctorId]';
import DoctorReview from '@/src/components/doctorPage/DoctorReview/DoctorReview';
import { getDoctor } from '@/src/utils/helpers/api/getDoctor';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import declarationOfNumber from '@/src/utils/helpers/declarationOfNumber';

import styles from './DoctorReviews.module.scss';

interface ReviewWithPatientName extends Reviews {
  patient: Pick<Patient, 'name'>;
}
interface DoctorReviewsProps extends Doctors {
  reviews: ReviewWithPatientName[];
}
interface DoctorReviewsPageProps {
  doctor: DoctorReviewsProps;
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { doctorId },
  resolvedUrl
}) => {
  const props = await getDoctor({ doctorId: doctorId as string, resolvedUrl });
  return props;
};

const cx = bindStyles(styles);

const DoctorReviewsPage = ({ doctor: { reviews } }: DoctorReviewsPageProps) => {
  const renderReviews = () =>
    reviews.map(({ patientId, date, rating, text, patient: { name } }) => (
      <DoctorReview key={patientId + date} name={name} rating={rating} date={date} text={text} />
    ));
  const countOfReviews = declarationOfNumber(reviews.length, ['отзыв', 'отзыва', 'отзывов']);
  return (
    <div>
      <h3 className={cx('title')}>{`${reviews.length} ${countOfReviews}`}</h3>
      <ul className={cx('list')}>{renderReviews()}</ul>
    </div>
  );
};

DoctorReviewsPage.Layout = DoctorLayout;
export default DoctorReviewsPage;
