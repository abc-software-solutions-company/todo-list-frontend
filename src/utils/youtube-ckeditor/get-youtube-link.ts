import {convertYoutubeEmbed} from './convert_youtube_embed';

export const getYoutubeLink = (data: string) => {
  const startIndex = data.indexOf(`http`);
  const endIndex = data.lastIndexOf(`"`);
  return convertYoutubeEmbed(data.slice(startIndex, endIndex));
};
