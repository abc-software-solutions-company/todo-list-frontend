import {formatAmPm} from './format-am-pm';

export const formatForNotification = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', {month: 'long'});
  const day = date.getDate();
  const hour = formatAmPm(date);

  const result = `${month} ${day} at ${hour}`;
  return result;
};
