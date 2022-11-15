import {extractImageLinks} from '@/utils/sync-attachment/extract-image-link';

const s3BaseURL = `https://todo-list-website-production.s3.ap-southeast-1.amazonaws.com`;

export const uploadImageOnline = (rawHTML: string) => {
  const listImageOriginal = extractImageLinks(rawHTML);
  const listImageOnline = listImageOriginal.filter(x => !x.includes(s3BaseURL));
  console.log(listImageOnline);
};
