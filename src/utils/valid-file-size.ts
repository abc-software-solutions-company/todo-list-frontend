const MAX_SIZE = 26214400;
export const validFileSize = (file: File) => {
  // As a user, I can upload an file only with maximum size is 25MB: 26214400 Bytes
  if (file.size > MAX_SIZE) return false;
  return true;
};
