import { Appointments, Doctors, DoctorsSchedule } from '@prisma/client';
import { Modal } from 'antd';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { checkIsTodayWeekend } from '@/src/utils/helpers/checkIsTodayWeekend';
import { renderAppointmentTabs } from '@/src/utils/helpers/renderAppointmentTabs';
import { renderAppointmentTime } from '@/src/utils/helpers/renderAppointmentTime';

import AppointmentForm from '../AppointmentForm/AppointmentForm';

import styles from './AppointmentTime.module.scss';

interface AppointmentTimeProps {
  doctor: Doctors;
  full: boolean;
  schedule: DoctorsSchedule[];
  appointments: Appointments[];
}

const cx = bindStyles(styles);

const AppointmentTime = ({ doctor, full, schedule, appointments }: AppointmentTimeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<number>(checkIsTodayWeekend(schedule[0].weekend));
  const [currentAppointment, setCurrentAppointment] = useState<number | null>(null);
  const [isAllTimes, setIsAllTimes] = useState(false);
  const { scheduleStart, scheduleEnd, interval, weekend } = schedule[0];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleAppointment = (appointDate: number) => {
    setCurrentAppointment(appointDate);
    showModal();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDate = (date: number) => {
    setActiveDay(date);
  };
  const handleAllTimes = () => setIsAllTimes(!isAllTimes);

  const times = renderAppointmentTime({
    doctorId: doctor.uid,
    day: activeDay,
    scheduleStart,
    scheduleEnd,
    interval,
    appointments,
    onClick: handleAppointment
  });

  const tabs = renderAppointmentTabs({
    full,
    weekend,
    activeDay,
    onClick: handleDate
  });

  return (
    <div
      className={cx('container', {
        containerFull: full
      })}
    >
      <h3 className={cx('title')}>Выберите время приёма для записи онлайн</h3>
      <div className={cx('tabs')}>{tabs}</div>
      {times.length === 0 ? (
        <span>На этот день записей нет</span>
      ) : (
        <ul
          className={cx('times', {
            timesFull: full
          })}
        >
          {isAllTimes ? times : times.slice(0, 14)}
          {times.length > 15 && (
            <button className={cx('time', 'moreButton')} onClick={handleAllTimes}>
              {isAllTimes ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
            </button>
          )}
        </ul>
      )}

      <Modal title='Запись на прием' open={isModalOpen} onCancel={handleCancel} footer={false}>
        <AppointmentForm doctor={doctor} handleCancel={handleCancel} time={currentAppointment!} />
      </Modal>
    </div>
  );
};

export default AppointmentTime;
