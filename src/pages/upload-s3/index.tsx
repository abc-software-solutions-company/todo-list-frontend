import aws from 'aws-sdk';
import {ManagedUpload, PutObjectRequest} from 'aws-sdk/clients/s3';
import React from 'react';
import {useForm} from 'react-hook-form';

aws.config.update({
  accessKeyId: 'AKIAWKOFN5TU5IT42IFX',
  secretAccessKey: '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',
  region: 'ap-southeast-1'
});

const s3 = new aws.S3();

type FormValues = {
  image: File[];
};

export default function UploadImage() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormValues>();
  const onSubmit = handleSubmit(data => {
    const {name} = data.image[0];
    const imageFile = data.image[0];

    const s3ObjectRequest: PutObjectRequest = {
      Bucket: 'todo-list-website-production',
      Body: imageFile,
      Key: `data/${name}`,
      ACL: 'public-read'
    };

    s3.upload(s3ObjectRequest, function (err: Error, response: ManagedUpload.SendData) {
      if (err) {
        console.log('Error', err);
      }
      if (response) {
        console.log('Link image to save in database: ', response.Location);
        console.log(response);
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <input {...register('image', {required: true})} type="file" />
      {errors?.image && <p>Image bắt buộc thêm</p>}

      <input type="submit" />
    </form>
  );
}
