const optionsMap = {
  full: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC'
  },
  short: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC'
  },
  time: {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC'
  }
};

export const getStringFromDate = (date: Date, type: 'full' | 'short' | 'time') => {
  const options = optionsMap[type];
  // @ts-ignore
  return new Date(date).toLocaleString('ru', options);
};
