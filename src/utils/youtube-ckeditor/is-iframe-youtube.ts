export const isIFrameYoutube = (data: string) => {
  if (data.includes('youtu.be')) return true;
  return false;
};
