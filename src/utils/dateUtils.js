import moment from 'moment';

export const formatDateAndTimeToISO = (date, time) => {
  const year = Number(date.split('-')[0]);
  const month = Number(date.split('-')[1]) - 1;
  const day = Number(date.split('-')[2]);
  const hour = Number(time.split(':')[0]);
  const minutes = Number(time.split(':')[1]);
  const isoDate = new Date(year, month, day, hour, minutes);
  return moment(isoDate).format();
};

export const formatDateISOToString = date => {
  return moment(date).format('D MMMM в H:mm');
};

export const dateNow = format => {
  return moment().format(format);
};

export const beforeNowDates = datetime => {
  if (datetime) {
    const newDate = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
    return moment().isBefore(newDate);
  }
};

export const afterNowDates = datetime => {
  if (datetime) {
    const newDate = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
    return moment().isAfter(newDate);
  }
};

export const formatDate = date => {
  let diff = moment(date).endOf('day').diff(moment().endOf('day'), 'day');
  if (diff === 0) return 'сегодня';
  if (diff === 1) return 'завтра';
  return moment(date).format('DD MMMM');
};
