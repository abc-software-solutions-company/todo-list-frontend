export const extractUrl = (rawHTML_Text: string) => {
  const listLinkRaw = rawHTML_Text.split('"');
  return listLinkRaw.filter(e => e.startsWith('http'));
};
