export const convertYoutubeEmbed = (data: string) => {
  if (data.includes('youtube.com')) {
    const url = data.replace(`youtube.com`, `youtube.com/embed`);
    return url.replace(`watch?v=`, ``);
  }
  return data.replace(`youtu.be`, `youtube.com/embed`);
};
