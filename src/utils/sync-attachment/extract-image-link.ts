export const extractImageLinks = (rawHTML_Text: string) => {
  const listLinkRaw = rawHTML_Text.replaceAll('><', '>\n<');
  const arrayTag = listLinkRaw.split('\n');
  const listImgLink: string[] = [];
  arrayTag.forEach(e => {
    if (e.startsWith('<img')) {
      const startIndex = e.indexOf('http');
      const endIndex = e.lastIndexOf('"');
      const url = e.substring(startIndex, endIndex);
      listImgLink.push(url);
    }
  });
  return listImgLink;
};
