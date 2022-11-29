export const getYoutubeLink = (data: string) => {
  return data.split(' ')[1].slice(5, -12);
};
