import aws from 'aws-sdk';
import {PutObjectRequest} from 'aws-sdk/clients/s3';
import axios from 'axios';

const s3BaseURL = `https://todo-list-website-production.s3.ap-southeast-1.amazonaws.com`;

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION
});

const s3 = new aws.S3();

export const imgOnlineToS3 = (url: string) => {
  return new Promise((resolve: any, reject: any) => {
    if (!url.includes(s3BaseURL))
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob'
      }).then(res => {
        const s3ObjectRequest: PutObjectRequest = {
          Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
          Body: res.data,
          Key: `${process.env.NEXT_PUBLIC_AWS_BUCKET_ENV}/${url.split('/').pop()}.png`,
          ACL: 'public-read'
        };

        s3.upload(s3ObjectRequest)
          .promise()
          .then(fileRes => {
            resolve({url: `${fileRes.Location}`});
          });
      });
    else {
      reject({url: `${url}`});
    }
  });
};
