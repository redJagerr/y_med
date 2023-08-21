import { Appointments, Doctors, Reviews } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import PatientAppointment from '@/src/components/patient/PatientAppointment/PatientAppointment';
import NoItemsMessage from '@/src/components/shared/NoItemsMessage/NoItemsMessage';
import PaginationWithRouter from '@/src/components/shared/PaginationWithRouter/PaginationWithRouter';
import { getPatientAppointments } from '@/src/utils/helpers/api/appointments';
import { getUidFromToken } from '@/src/utils/helpers/api/getUidFromToken';
import { getReviews } from '@/src/utils/helpers/api/reviews';
import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './HomePage.module.scss';

export interface AppointmentsWithDoctor extends Appointments {
  doctor: Doctors;
  reviews: Reviews[];
}

interface HomepageProps {
  appointments: AppointmentsWithDoctor[];
  reviews: Reviews[];
  pages: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const uid = await getUidFromToken(ctx);
    const { page } = ctx.query;
    const { appointments, pages } = await getPatientAppointments({ uid, page: page as string });
    const reviews = await getReviews(uid);

    return { props: { appointments, pages, reviews } };
  } catch (err) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return { props: {} as never };
  }
};

const cx = bindStyles(styles);

const HomePage = ({ appointments, pages, reviews }: HomepageProps) => {
  const [isHistoryHidden, setIsHistoryHidden] = useState(false);

  const reviewedDoctors: Set<string> = new Set(reviews.map((review: Reviews) => review.doctorId));

  const handleHistory = () => {
    setIsHistoryHidden(!isHistoryHidden);
  };

  const renderAppontments = (appointmentsType: string[]) =>
    appointments
      .filter((appointment) => appointmentsType.includes(appointment.status))
      .map((appointment) => {
        const isReviewedDoctor = reviewedDoctors.has(appointment.doctorId);
        return (
          <PatientAppointment
            appointment={appointment}
            isReviewedDoctor={isReviewedDoctor}
            key={String(appointment.time) + appointment.doctorId}
          />
        );
      });

  const upcomingAppointments = renderAppontments(['confirmed', 'unconfirmed']).reverse();
  const historyAppointments = renderAppontments(['canceled', 'completed']);
  const isUpcomingAppointments = upcomingAppointments.length !== 0;
  const isHistoryAppointments = historyAppointments.length !== 0;

  return (
    <>
      <Head>
        <title>Med App</title>
      </Head>
      <section>
        <span className={cx('title')}>Предстоящие приемы</span>
        {isUpcomingAppointments ? (
          <ul className={cx('appointments')}>{upcomingAppointments}</ul>
        ) : (
          <NoItemsMessage>У Вас нет записей на прием</NoItemsMessage>
        )}
        <div className={cx('historyHeader')}>
          <span className={cx('title')}>История посещений</span>
          <button onClick={handleHistory}>
            {isHistoryHidden ? <AiFillCaretUp size={24} /> : <AiFillCaretDown size={24} />}
          </button>
        </div>
        {isHistoryHidden && (
          <div className={cx('history')}>
            {isHistoryAppointments ? (
              <>
                <ul className={cx('appointments')}>{historyAppointments}</ul>
                <PaginationWithRouter pages={pages} />
              </>
            ) : (
              <NoItemsMessage> У Вас еще нет истории приемов</NoItemsMessage>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;
