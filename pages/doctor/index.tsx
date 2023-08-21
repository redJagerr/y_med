import { Appointments, Doctors, DoctorsSchedule, Patient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import DoctorAccountHeader from '@/src/components/doctorAccount/DoctorAccountHeader/DoctorAccountHeader';
import DoctorAppointmentItem from '@/src/components/doctorAccount/DoctorAppointmentItem/DoctorAppointmentItem';
import NoItemsMessage from '@/src/components/shared/NoItemsMessage/NoItemsMessage';
import {
  changeAppointmentStatus,
  getDoctorAppointments
} from '@/src/utils/helpers/api/appointments';
import { getUidFromToken } from '@/src/utils/helpers/api/getUidFromToken';
import { getUser } from '@/src/utils/helpers/api/user';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { checkIsTodayWeekend } from '@/src/utils/helpers/checkIsTodayWeekend';
import { renderAppointmentTabs } from '@/src/utils/helpers/renderAppointmentTabs';

import styles from './MedcardPage.module.scss';

export interface AppointmentsWithPatient extends Appointments {
  patient: Patient;
}
interface DoctorWithPatientNameAndSchedule extends Doctors {
  patient: Pick<Patient, 'name'>;
  schedule: DoctorsSchedule[];
}
interface DoctorAccountPageProps {
  appointments: AppointmentsWithPatient[];
  doctorInfo: DoctorWithPatientNameAndSchedule;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const uid = await getUidFromToken(ctx);
    const appointments = await getDoctorAppointments({ uid, date: ctx.query.date as string });
    const doctorInfo = await getUser({ uid, type: 'doctor' });
    return { props: { appointments, doctorInfo } };
  } catch (err) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return { props: {} as never };
  }
};

const cx = bindStyles(styles);

const DoctorAccountPage = ({ appointments, doctorInfo }: DoctorAccountPageProps) => {
  const router = useRouter();

  const {
    query: { date }
  } = router;

  const { name, photoUrl, schedule } = doctorInfo;

  const [activeDay, setActiveDay] = useState<number>(
    checkIsTodayWeekend(schedule[0].weekend, Number(date))
  );

  const handleClick = (day: number) => {
    setActiveDay(day);
    router.query.date = day.toString();
    router.push(router);
  };

  const renderAppontments = appointments.map(({ id, time, patient, speciality, patientId }) => (
    <DoctorAppointmentItem
      id={id}
      time={time}
      patient={patient}
      speciality={speciality}
      patientId={patientId}
      onClick={() => changeAppointmentStatus(router, id, 'completed')}
    />
  ));

  const isAppointments = appointments.length !== 0;

  return (
    <div className={cx('container')}>
      <DoctorAccountHeader
        name={name}
        photoUrl={photoUrl}
        appointmentsNumber={appointments.length}
      />
      <h2>Мои записи</h2>
      <div className={cx('tabs')}>
        {renderAppointmentTabs({
          full: true,
          weekend: schedule[0].weekend,
          activeDay,
          onClick: handleClick
        })}
      </div>
      {isAppointments ? (
        <ul className={cx('appointments')}>{renderAppontments}</ul>
      ) : (
        <NoItemsMessage className={cx('title')}>На этот день записей нет</NoItemsMessage>
      )}
    </div>
  );
};

export default DoctorAccountPage;
