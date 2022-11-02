import dateFormat from 'dateformat';

export function getDate(date: Date) {
  const now = new Date();
  const deviant = now.valueOf() - date.valueOf();
  const deviantSeconds = Math.floor(deviant / 1000);
  if (deviantSeconds === 0) return 'just now';
  if (deviantSeconds < 10) return 'a few seconds ago';
  if (deviantSeconds < 60) return deviantSeconds + ' seconds ago';
  const deviantMinutes = Math.floor(deviant / (60 * 1000));
  if (deviantMinutes < 60) return deviantMinutes + ' minutes ago';
  const deviantHours = Math.floor(deviant / (60 * 60 * 1000));
  if (deviantHours < 24) return deviantHours + ' hours ago';
  return dateFormat(date, 'dddd, mmmm dS, h:MM TT');
}
