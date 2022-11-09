import aws from 'aws-sdk';
import {ManagedUpload, PutObjectRequest} from 'aws-sdk/clients/s3';
import classNames from 'classnames';
import {ChangeEvent, FC, useState} from 'react';
import {useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import api from '@/data/api';
import {IAttachment, ITaskResponse} from '@/data/api/types/task.type';
import {imageValid} from '@/utils/image-valid';

import style from './style.module.scss';

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION
});

const s3 = new aws.S3();

type FormValues = {
  attachments: File[];
};

export interface IUpload {
  className?: string;
  taskData: ITaskResponse;
  previewAttachments: IAttachment[];
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccess: () => void;
  onError: () => void;
}

const Upload: FC<IUpload> = ({taskData, onSuccess, onUpload, previewAttachments, className, onError}) => {
  const {register, handleSubmit} = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinally = (isEnd?: boolean) => {
    if (isEnd) {
      setIsSubmitting(false);
    }
  };

  const onSubmit = handleSubmit(async ({attachments}) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    for (let i = 0; i < attachments.length; i++) {
      const image = attachments[i];
      const name = Date.now() + image.name;

      if (!imageValid(image)) {
        setIsSubmitting(false);
        onError();
        return;
      }
      const s3ObjectRequest: PutObjectRequest = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Body: image,
        Key: `${process.env.NEXT_PUBLIC_AWS_BUCKET_ENV}/${name}`,
        ACL: 'public-read'
      };
      s3.upload(s3ObjectRequest, (err: Error, response: ManagedUpload.SendData) => {
        if (err) console.log('Error', err);
        if (response) {
          console.log(response);
          api.task
            .update({id: taskData.id, attachment: {create: {name: image.name, link: response.Location}}})
            .then(onSuccess)
            .catch(error => console.log(error))
            .finally(() => onFinally(i + 1 === attachments.length));
        }
      });
    }
  });

  return (
    <form className={classNames(style.upload, className)} onSubmit={onSubmit}>
      <div className="form-body">
        <Button type="button" className="add">
          <span>Add atachments</span>
          <input {...register('attachments', {required: true})} type="file" onChange={onUpload} multiple />
        </Button>
        {previewAttachments.length > 0 && (
          <Button type="submit" color="primary" variant="contained" disabled={isSubmitting} loading={isSubmitting}>
            Upload
          </Button>
        )}
      </div>
    </form>
  );
};

export default Upload;
