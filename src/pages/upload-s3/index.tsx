import React from 'react';
import {Resolver, useForm} from 'react-hook-form';

type FormValues = {
  firstName: string;
  lastName: string;
  image: any;
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
  const onSubmit = handleSubmit(data => console.log(data));

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
