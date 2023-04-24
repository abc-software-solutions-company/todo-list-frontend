const CDN_URL = process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL;
const S3_URL = process.env.NEXT_PUBLIC_AWS_S3_URL;
export const replaceCdnUrl = (content: string): string => {
  if (CDN_URL && S3_URL) {
    const newURl = content.replaceAll(S3_URL, CDN_URL);
    return newURl;
  }
  return content;
};
