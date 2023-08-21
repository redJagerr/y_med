import dayjs from 'dayjs';

export const getDateWithoutTime = (date?: number) => {
  const currentDay = date ? dayjs(date) : dayjs();
  return currentDay.set('h', 0).set('m', 0).set('s', 0).set('ms', 0).valueOf();
};
