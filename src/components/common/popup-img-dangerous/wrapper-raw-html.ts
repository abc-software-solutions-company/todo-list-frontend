export const wrapperRawHTML = (rawHTML_Text: string) => {
  const listLinkRaw = rawHTML_Text.replaceAll('><', '>\n<');
  const arrayTag = listLinkRaw.split('\n');

  const newRawHTML: string[] = [];
  arrayTag.forEach(e => {
    if (e.startsWith('<img')) {
      const startIndex = e.indexOf('http');
      const endIndex = e.lastIndexOf('"');
      const url = e.substring(startIndex, endIndex);
      const startIndexStyle = e.indexOf(`style="`);
      const endIndexStyle = e.lastIndexOf(`;"`);
      const styleProp = e.substring(startIndexStyle, endIndexStyle);
      const wrapper = `
      <a class="glightbox-danger" href="${url}" style="${styleProp}">
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
