import {getYoutubeLink} from './get-youtube-link';
import {iframeYoutube} from './iframe-youtube';
import {isIFrameYoutube} from './is-iframe-youtube';

export const wrapperIFrameYoutube = (data: string) => {
  const listLinkRaw = data.replaceAll('><', '>\n<');
  const arrayTag = listLinkRaw.split('\n');
  const newRawHTML: string[] = [];
  arrayTag.forEach(e => {
    if (isIFrameYoutube(e)) {
      const url = getYoutubeLink(e);
      const iframe = iframeYoutube(url);
      newRawHTML.push(iframe);
    } else {
      newRawHTML.push(e);
    }
  });
  return newRawHTML.join('\n');
};
