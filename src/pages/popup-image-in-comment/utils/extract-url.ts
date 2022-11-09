export const extractUrl = (rawHTML_Text: string) => {
  const listLinkRaw = rawHTML_Text.replaceAll('><', '>\n<');
  const arrayTag = listLinkRaw.split('\n');
  // console.log(arrayTag);
  const newRawHTML: string[] = [];
  arrayTag.forEach(e => {
    if (e.startsWith('<img')) {
      const startIndex = e.indexOf('http');
      const endIndex = e.lastIndexOf('"');
      const url = e.substring(startIndex, endIndex);
      const wrapper = `
      <a class="glightbox" href="${url}">
        <img src="${url}" />
      </a>
      `;
      newRawHTML.push(wrapper);
    } else {
      newRawHTML.push(e);
    }
  });
  return newRawHTML.join('\n');
};
