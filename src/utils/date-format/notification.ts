export const formatForNotification = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', {month: 'long'});
  const day = date.getDate();
  const hour = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

  const result = `${month} ${day} at ${hour}`;
  return result;
};
