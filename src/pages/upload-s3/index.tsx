import aws from 'aws-sdk';
import React from 'react';
import {Resolver, useForm} from 'react-hook-form';

aws.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
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
    const file = data.image;
    console.log(file[0].name);

    const params = {
      Bucket: 'todo-list-website-production',
      // Body: fs.createReadStream(filePath),
      Key: `image/${data.image}`,
      ACL: 'public-read'
    };
    console.log(params);
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
