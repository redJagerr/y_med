import React from 'react';
import { MdClose, MdDone, MdHourglassTop } from 'react-icons/md';

import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { AppointmentStatusType } from '@/types';

import styles from './AppointmentStatus.module.scss';

const statusMap = {
  confirmed: {
    icon: <MdDone size={16} />,
    title: 'Прием подтвержден'
  },
  unconfirmed: {
    icon: <MdHourglassTop size={16} />,
    title: 'Прием не подтвержден'
  },
  completed: {
    icon: <MdDone size={16} />,
    title: 'Прием завершен'
  },
  canceled: {
    icon: <MdClose size={16} />,
    title: 'Прием отменен'
  }
};

const cx = bindStyles(styles);

const AppointmentStatus = ({ status }: { status: AppointmentStatusType }) => {
  const { title, icon } = statusMap[status];
  return (
    <div
      className={cx('container', {
        confirmed: status === 'confirmed',
        unconfirmed: status === 'unconfirmed',
        completed: status === 'completed',
        canceled: status === 'canceled'
      })}
    >
      {icon}
      {title}
    </div>
  );
};

export default AppointmentStatus;
