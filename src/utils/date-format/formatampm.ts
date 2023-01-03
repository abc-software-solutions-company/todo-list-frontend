export const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ap = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = Number(minutes.toString().padStart(2, '0'));
  const mergeTime = hours + ':' + minutes + ' ' + ap;
  return mergeTime;
};
