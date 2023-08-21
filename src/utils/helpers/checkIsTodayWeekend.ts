import dayjs from 'dayjs';

import { getDateWithoutTime } from './getDateWithoutTime';

export const checkIsTodayWeekend = (doctorWeekend: number[], day?: number) => {
  const today = getDateWithoutTime(day);
  return doctorWeekend.includes(dayjs(today).day())
    ? dayjs(today).add(1, 'day').valueOf()
    : today.valueOf();
};
