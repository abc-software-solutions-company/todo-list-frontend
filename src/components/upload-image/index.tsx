import aws from 'aws-sdk';
import {ManagedUpload, PutObjectRequest} from 'aws-sdk/clients/s3';
import classNames from 'classnames';
import React, {FC} from 'react';
import {useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';

import style from './style.module.scss';

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION
});

const s3 = new aws.S3();

type FormValues = {
  image: File[];
};

export interface IUploadImage {
  taskData: ITaskResponse;
  onSuccess?: () => void;
}
const UploadImage: FC<IUploadImage> = ({taskData, onSuccess}) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => {
    if (isSubmitting) return;
    const {name} = data.image[0];
    const imageFile = data.image[0];

    const s3ObjectRequest: PutObjectRequest = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
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
        api.task
          .update({id: taskData.id, images: {add: [response.Location]}})
          .then(onSuccess)
          .catch(error => console.log(error));
      }
    });
  });

  return (
    <form className={classNames('mt-5 flex flex-col gap-5', style.upload)} onSubmit={onSubmit}>
      <Button type="button" color="primary" variant="outlined" className="relative cursor-pointer">
        <input {...register('image', {required: true})} type="file" className="absolute h-full w-full cursor-pointer opacity-0" />
        <div>Upload Image</div>
      </Button>
      {errors?.image && <p>Image bắt buộc thêm</p>}
      <br />
      <Button type="submit" color="primary" variant="contained" disabled={isSubmitting} loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export default UploadImage;
