const MAX_SIZE = 5242880;
export const imageValid = (image: File) => {
  // As a user, I can upload an file type image only with maximum size is 5MB: 1048576 Bytes
  if (!image.type.startsWith('image')) return false;
  if (image.size > MAX_SIZE) return false;
  return true;
};
