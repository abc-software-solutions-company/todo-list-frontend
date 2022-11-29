export const convertYoutubeEmbed = (data: string) => {
  return data.replace(`https://youtu.be/`, `https://www.youtube.com/embed/`);
};
