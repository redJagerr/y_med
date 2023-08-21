import { Appointments, Doctors, Patient } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AdminAppointmentItem from '@/src/components/admin/AdminAppointmentItem/AdminAppointmentItem';
import NoItemsMessage from '@/src/components/shared/NoItemsMessage/NoItemsMessage';
import Button from '@/src/components/UI/Button/Button';
import { changeAppointmentStatus, getAdminAppointment } from '@/src/utils/helpers/api/appointments';
import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './AdminPage.module.scss';

export interface DoctorAppointmentsForAdmin extends Appointments {
  patient: Pick<Patient, 'name' | 'phone'>;
  doctor: Pick<Doctors, 'name'>;
}
interface AdminPageProps {
  appointments: DoctorAppointmentsForAdmin[];
}
export const getServerSideProps = async () => {
  const appointments = await getAdminAppointment();
  return { props: { appointments } };
};

const cx = bindStyles(styles);

const AdminPage = ({ appointments }: AdminPageProps) => {
  const router = useRouter();

  const appointmentsList = appointments.map(({ id, patient, doctor, time }) => (
    <AdminAppointmentItem
      patientName={patient.name}
      doctorName={doctor.name}
      time={time}
      patientPhone={patient.phone}
      onClick={() => changeAppointmentStatus(router, id, 'confirmed')}
    />
  ));

  const isNoAppointments = appointments.length === 0;

  return (
    <div className={cx('container')}>
      <Button className={cx('register')}>
        <Link href='/admin/addDoctor'>Регистрация доктора</Link>
      </Button>
      <h2>Подтвердить записи</h2>
      {isNoAppointments ? (
        <NoItemsMessage className={cx('message')}>Нет неподтвержденных записей</NoItemsMessage>
      ) : (
        <ul className={cx('appointments')}>{appointmentsList}</ul>
      )}
    </div>
  );
};

export default AdminPage;
