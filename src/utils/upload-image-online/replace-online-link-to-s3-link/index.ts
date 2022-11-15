import {imgOnlineToS3} from '../img-online-to-s3';

export const replaceOnlineLinkToS3Link = (rawHTML: string) => {
  const listLinkRaw = rawHTML.replaceAll('><', '>\n<');
  const arrayTag = listLinkRaw.split('\n');
  /* An array of string. */
  // const newRawHTML: string[] = [];
  const listIMG: string[] = [];

  // arrayTag.forEach(e => {
  // if (e.startsWith('<img')) {
  //   const startIndex = e.indexOf('http');
  //   const endIndex = e.lastIndexOf('"');
  //   const url = imgOnlineToS3(e.substring(startIndex, endIndex));
  //   url.then(res => {
  //     listIMG.push(res)
  //   })});

  arrayTag.forEach(e => {
    if (e.startsWith('<img')) {
      const startIndex = e.indexOf('http');
      const endIndex = e.lastIndexOf('"');
      const url = imgOnlineToS3(e.substring(startIndex, endIndex));
      url.then(res => {
        listIMG.push(res as string);
      });
    }
  });

  return listIMG;
};
