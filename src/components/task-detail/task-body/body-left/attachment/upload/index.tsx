import aws from 'aws-sdk';
import {ManagedUpload, PutObjectRequest} from 'aws-sdk/clients/s3';
import classNames from 'classnames';
import {ChangeEvent, FC} from 'react';

import useTask from '@/components/task-detail/hooks/use-task';
import Button from '@/core-ui/button';
import IconButton from '@/core-ui/icon-button';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IBaseProps} from '@/types';
import {imageValid} from '@/utils/image-valid';

import style from './style.module.scss';

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION
});

const s3 = new aws.S3();

const Upload: FC<IBaseProps> = ({className}) => {
  const toast = useToast();
  const {task, update} = useTask();
  const {id} = task;

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const name = file.name;

        if (!imageValid(file)) {
          toast.show({type: 'danger', title: 'error', content: `${name} not is a image or weight more than 5 MB `});
          continue;
        }

        const s3ObjectRequest: PutObjectRequest = {
          Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
          Body: file,
          Key: `${process.env.NEXT_PUBLIC_AWS_BUCKET_ENV || 'data-test'}/${Date.now() + name}`,
          ACL: 'public-read'
        };

        s3.upload(s3ObjectRequest, (err: Error, response: ManagedUpload.SendData) => {
          if (err) console.log('Error', err);
          if (response) {
            api.task
              .update({id, attachment: {create: {name: name, link: response.Location}}})
              .then(update)
              .then(() => toast.show({type: 'success', title: 'success', content: `Update ${name} Successfull`}));
          }
        });
      }
    }
  };

  return (
    <div className={classNames(style.upload, className)}>
      <div className="upload-button">
        <Button type="button" className="add-desktop">
          <span>Add attachments</span>
        </Button>
        <IconButton name="ico-plus-circle" className="add-mobile" />
        <input name="attachments" type="file" onChange={onUpload} multiple />
      </div>
    </div>
  );
};

export default Upload;
