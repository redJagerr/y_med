import { Appointments } from '@prisma/client';
import cnBind from 'classnames/bind';
import dayjs from 'dayjs';

import styles from '@/components/appointment/AppointmentTime/AppointmentTime.module.scss';

interface RenderAppointmentTimeArgs {
  doctorId: string;
  day: number;
  scheduleStart: string;
  scheduleEnd: string;
  appointments: Appointments[];
  interval: number;
  onClick: (i: number) => void;
}

const cx = cnBind.bind(styles);

export const renderAppointmentTime = ({
  doctorId,
  day,
  scheduleStart,
  scheduleEnd,
  interval,
  appointments,
  onClick
}: RenderAppointmentTimeArgs) => {
  const appointmentTimeButtons = [];
  const busyTime = appointments.map((i) => dayjs(i.time).valueOf());
  const fromTimeArray = scheduleStart.split(':');
  const toTimeArray = scheduleEnd.split(':');

  const addTimezone = (time: number) => dayjs(time).add(3, 'hour').valueOf();

  const isActiveToday = dayjs().get('date').valueOf() === dayjs(day).get('date').valueOf();
  const timeNow = addTimezone(dayjs().valueOf());

  const sumDayTime = (hours: string, minutes: string) =>
    dayjs(day).set('hours', Number(hours)).set('minutes', Number(minutes)).valueOf();
  const addPeriod = (time: number) => dayjs(time).add(interval, 'minute').valueOf();
  const checkZero = (number: number) => (number < 10 ? `0${number}` : number);

  const from = sumDayTime(fromTimeArray[0], fromTimeArray[1]);
  const to = sumDayTime(toTimeArray[0], toTimeArray[1]);

  for (let currentTime = from; currentTime < to; currentTime = addPeriod(currentTime)) {
    const currentTimeWithTimezone = addTimezone(currentTime);
    if (busyTime.includes(currentTimeWithTimezone) || (isActiveToday && currentTime < timeNow))
      continue;

    const date = new Date(currentTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    appointmentTimeButtons.push(
      <li className={cx('time')} key={doctorId + currentTimeWithTimezone}>
        <button onClick={() => onClick(currentTimeWithTimezone)}>{`${checkZero(hours)}:${checkZero(
          minutes
        )}`}</button>
      </li>
    );
  }
  return appointmentTimeButtons;
};
