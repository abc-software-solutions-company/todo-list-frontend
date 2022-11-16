import {imgOnlineToS3} from '../img-online-to-s3';

export const replaceOnlineLinkToS3Link = (rawHTML: string) => {
  return new Promise((resolve: any, reject: any) => {
    const listLinkRaw = rawHTML.replaceAll('><', '>\n<');
    const arrayTag = listLinkRaw.split('\n');
    console.log(arrayTag.length);

    const newRawHTML: string[] = [];
    arrayTag.forEach(e => {
      if (e.startsWith('<img')) {
        const startIndex = e.indexOf('http');
        const endIndex = e.lastIndexOf('"');
        const url = imgOnlineToS3(e.substring(startIndex, endIndex));
        url
          .then(res => {
            console.log(res);

            newRawHTML.push(res as string);
          })
          .catch(res => {
            console.log(res);

            newRawHTML.push(res as string);
          });
      } else {
        newRawHTML.push(e);
      }
    });
    resolve({data: newRawHTML});
    reject({data: newRawHTML});
  });
};
