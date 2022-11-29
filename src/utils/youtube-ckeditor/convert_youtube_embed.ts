export const convertYoutubeEmbed = (data: string) => {
  if (data.includes('youtube.com')) {
    return data.replace(`youtube.com`, `youtube.com/embed`);
  }
  return data.replace(`youtu.be`, `youtube.com/embed`);
};
