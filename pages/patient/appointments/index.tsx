import cnBind from 'classnames/bind';
import { GetServerSideProps } from 'next';

import AppointmentTime from '@/src/components/appointment/AppointmentTime/AppointmentTime';
import DoctorOverview from '@/src/components/doctorPage/DoctorOverview/DoctorOverview';
import DoctorsSearch from '@/src/components/doctors/DoctorsSearch/DoctorsSearch';
import NoItemsMessage from '@/src/components/shared/NoItemsMessage/NoItemsMessage';
import PaginationWithRouter from '@/src/components/shared/PaginationWithRouter/PaginationWithRouter';
import { getDoctors } from '@/src/utils/helpers/api/getDoctors';
import { DoctorsFullInfo } from '@/types';

import styles from './appointmentPage.module.scss';

interface AppointmentPageProps {
  doctors: DoctorsFullInfo[];
  pages: string;
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { speciality, sort, page }
}) => {
  if (typeof page === 'string' && typeof sort === 'string') {
    const doctorsData = await getDoctors({ speciality: speciality as string, sort, page });
    const { doctors, pages } = doctorsData;
    return { props: { doctors, pages } };
  }
  return { props: {} as never };
};

const cx = cnBind.bind(styles);

const AppointmentPage = ({ doctors, pages }: AppointmentPageProps) => {
  const renderDoctors = () =>
    doctors.map((doctor: DoctorsFullInfo) => (
      <li className={cx('doctor')} key={doctor.uid}>
        <DoctorOverview key={doctor.uid} overview={false} {...doctor} />
        <AppointmentTime
          full={false}
          doctor={doctor}
          schedule={doctor.schedule}
          appointments={doctor.appointments}
        />
      </li>
    ));

  const isNoDoctors = doctors.length === 0;

  return (
    <section className={cx('container')}>
      <h2>Запись на прием</h2>
      <DoctorsSearch />
      {isNoDoctors ? (
        <NoItemsMessage className={cx('title')}>Не найдено ни одного доктора </NoItemsMessage>
      ) : (
        <>
          <ul className={cx('doctors')}>{renderDoctors()}</ul>
          <PaginationWithRouter pages={pages} />
        </>
      )}
    </section>
  );
};

export default AppointmentPage;
