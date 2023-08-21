import dayjs from 'dayjs';

import { checkIsTodayWeekend } from './checkIsTodayWeekend';

interface RenderAppointmentTabsParams {
  full: boolean;
  weekend: number[];
  activeDay: number;
  onClick: (i: number) => void;
}

export const renderAppointmentTabs = ({
  full,
  weekend,
  activeDay,
  onClick
}: RenderAppointmentTabsParams) => {
  const dayNamesMap = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ];
  const exceptionsDaysInMonthMap = [3, 5, 8, 10];
  const amountOfTabs = full ? 5 : 3;

  const plusDay = (day: number) => (day === 6 ? 0 : day + 1);

  const plusDate = (date: number, month: number) => {
    if (exceptionsDaysInMonthMap.includes(month)) {
      return date === 30 ? 1 : date + 1;
    }
    if (month === 1) {
      return date === 28 ? 1 : date + 1;
    }
    return date === 31 ? 1 : date + 1;
  };

  let currentDay = checkIsTodayWeekend(weekend);

  const currentMonth = new Date(currentDay).getMonth();
  const todayNumber = new Date(currentDay).getDay();
  let currentDayNumber = new Date(currentDay).getDate();

  const tabs = [];

  for (let i = todayNumber; tabs.length < amountOfTabs; i = plusDay(i)) {
    if (weekend.includes(i)) continue;
    const dayString = dayNamesMap[i];
    const today = currentDay;
    const activeClass = today === activeDay ? 'bg-orange-500 text-white' : 'text-black';

    tabs.push(
      <button
        className={`rounded-md  px-2 py-1 ${activeClass}`}
        onClick={async () => onClick(today)}
      >
        {dayString}, {currentDayNumber}
      </button>
    );
    currentDayNumber = plusDate(currentDayNumber, currentMonth);
    currentDay = dayjs(currentDay).add(1, 'day').valueOf();
  }
  return tabs;
};
