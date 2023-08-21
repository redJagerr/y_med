import Link from 'next/link';

import Button from '@/components/UI/Button/Button';
import { AppointmentsWithPatient } from '@/pages/doctor';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { getStringFromDate } from '@/src/utils/helpers/getStringFromDate';

import styles from './DoctorAppointmentItem.module.scss';

interface DoctorAppointmentItemProps extends Omit<AppointmentsWithPatient, 'doctorId' | 'status'> {
  onClick: () => Promise<void>;
}

const cx = bindStyles(styles);

const DoctorAppointmentItem = ({
  onClick,
  id,
  time,
  patient,
  speciality,
  patientId
}: DoctorAppointmentItemProps) => (
  <li key={id + patient.name} className={cx('container')}>
    <span className={cx('date')}>{getStringFromDate(time, 'time')}</span>
    <div className={cx('info')}>
      <span className={cx('name')}>{patient.name}</span>
      <span>
        Специальность: <span className={cx('speciality')}>{speciality}</span>
      </span>
    </div>
    <div className={cx('buttons')}>
      <Button>
        <Link href={`/doctor/medcard/${patientId}?sort=all`}>Медкарта пациента</Link>
      </Button>
      <Button className={cx('complete')} onClick={onClick}>
        Завершить прием
      </Button>
    </div>
  </li>
);

export default DoctorAppointmentItem;
