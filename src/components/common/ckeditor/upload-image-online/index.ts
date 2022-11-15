import aws from 'aws-sdk';
import {PutObjectRequest} from 'aws-sdk/clients/s3';
import axios from 'axios';
import {reject} from 'lodash-es';

import {extractImageLinks} from '@/utils/sync-attachment/extract-image-link';

const s3BaseURL = `https://todo-list-website-production.s3.ap-southeast-1.amazonaws.com`;

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION
});

const s3 = new aws.S3();

export const uploadImageOnline = (rawHTML: string) => {
  const listImageOriginal = extractImageLinks(rawHTML);
  const listImageOnline = listImageOriginal.filter(x => !x.includes(s3BaseURL));

  listImageOnline.forEach(item => {
    console.log(item);
    axios({
      url: item,
      method: 'GET',
      responseType: 'blob'
    }).then(res => {
      console.log(res.data);
      const s3ObjectRequest: PutObjectRequest = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Body: res.data,
        Key: `${process.env.NEXT_PUBLIC_AWS_BUCKET_ENV}/${item.split('/').pop}.png`,
        ACL: 'public-read'
      };
      s3.upload(s3ObjectRequest)
        .promise()
        .then(fileRes => {
          console.log('Upload complete to s3');
          console.log(fileRes.Location);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};
