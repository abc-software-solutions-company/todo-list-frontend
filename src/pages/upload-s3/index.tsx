import aws from 'aws-sdk';
import React from 'react';
import {Resolver, useForm} from 'react-hook-form';

aws.config.update({
  accessKeyId: 'AKIAWKOFN5TU5IT42IFX',
  secretAccessKey: '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',
  region: 'ap-southeast-1'
});

const s3 = new aws.S3();

type FormValues = {
  firstName: string;
  lastName: string;
  image: File[];
};

const resolver: Resolver<FormValues> = async values => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: 'required',
            message: 'This is required.'
          }
        }
      : {}
  };
};

export default function UploadImage() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormValues>({resolver});
  const onSubmit = handleSubmit(data => {
    const {name} = data.image[0];
    const imageFile = data.image[0];

    const params = {
      Bucket: 'todo-list-website-production',
      Body: imageFile,
      Key: `data/${name}`,
      ACL: 'public-read'
    };

    s3.upload(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      }
      if (data) {
        console.log('Link image to save in database: ', data.Location);
        console.log(data);
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <input {...register('firstName')} placeholder="Bill" />
      {errors?.firstName && <p>{errors.firstName.message}</p>}

      <input {...register('lastName')} placeholder="Luo" />
      <input {...register('image')} type="file" />

      <input type="submit" />
    </form>
  );
}
