import aws from 'aws-sdk';
import {ManagedUpload, PutObjectRequest} from 'aws-sdk/clients/s3';
import classNames from 'classnames';
import {ChangeEvent, FC, useState} from 'react';
import {useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import api from '@/data/api';
import {IImage, ITaskResponse} from '@/data/api/types/task.type';
import {imageValid} from '@/utils/image-valid';

import style from './style.module.scss';

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION
});

const s3 = new aws.S3();

type FormValues = {
  images: File[];
};

export interface IUploadImage {
  className?: string;
  taskData: ITaskResponse;
  previewImages: IImage[];
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccess: () => void;
}

const UploadImage: FC<IUploadImage> = ({taskData, onSuccess, onUpload, previewImages, className}) => {
  const {register, handleSubmit} = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinally = (isEnd?: boolean) => {
    if (isEnd) {
      setIsSubmitting(false);
    }
  };

  const onSubmit = handleSubmit(async ({images}) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const copyImages = [...images];
    for (let i = 0; i < copyImages.length; i++) {
      const image = copyImages[i];
      const name = Date.now() + image.name;
      const imageSize = image.size;
      console.log('🚀 ~ file: index.tsx ~ line 51 ~ onSubmit ~ imageSize', imageSize);
      const imageType = image.type;
      console.log('🚀 ~ file: index.tsx ~ line 53 ~ onSubmit ~ imageType', imageType);
      console.log(imageValid());

      //imageType image/png

      const s3ObjectRequest: PutObjectRequest = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Body: image,
        Key: `data/${name}`,
        ACL: 'public-read'
      };
      s3.upload(s3ObjectRequest, (err: Error, response: ManagedUpload.SendData) => {
        if (err) console.log('Error', err);
        if (response) {
          console.log(response);
          api.task
            .update({id: taskData.id, images: {add: [{name: image.name, link: response.Location}]}})
            .then(onSuccess)
            .catch(error => console.log(error))
            .finally(() => onFinally(i + 1 === copyImages.length));
        }
      });
    }
  });

  return (
    <form className={classNames(style.upload, className)} onSubmit={onSubmit}>
      <div className="form-body">
        <Button type="button" className="add">
          <span>Add atachments</span>
          <input {...register('images', {required: true})} type="file" onChange={onUpload} multiple />
        </Button>
        {previewImages.length > 0 && (
          <Button type="submit" color="primary" variant="contained" disabled={isSubmitting} loading={isSubmitting}>
            Upload
          </Button>
        )}
      </div>
    </form>
  );
};

export default UploadImage;
