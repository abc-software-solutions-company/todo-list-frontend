export const isIFrameYoutube = (data: string) => {
  if (data.includes('youtu.be') || data.includes('youtube')) return true;
  return false;
};
