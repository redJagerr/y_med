import cnBind from 'classnames/bind';

import { getStringFromDate } from '@/src/utils/helpers/getStringFromDate';

import Button from '../../UI/Button/Button';

import styles from './AdminAppointmentItem.module.scss';

interface AdminAppointmentItemProps {
  patientName: string;
  doctorName: string;
  time: Date;
  patientPhone: string;
  onClick: () => void;
}

const cx = cnBind.bind(styles);

const AdminAppointmentItem = ({
  patientName,
  doctorName,
  time,
  patientPhone,
  onClick
}: AdminAppointmentItemProps) => (
  <li className={cx('container')}>
    <span>
      <span className={cx('title')}>Пациент: </span>
      {patientName}
    </span>
    <span>
      <span className={cx('title')}>Доктор: </span>
      {doctorName}
    </span>
    <span>
      <span className={cx('title')}>Время: </span>
      {getStringFromDate(time, 'full')}
    </span>
    <span>
      <span className={cx('title')}>Телефон пациента: </span>
      {patientPhone}
    </span>
    <Button className={cx('confirm')} onClick={onClick}>
      Подтвердить
    </Button>
  </li>
);

export default AdminAppointmentItem;
