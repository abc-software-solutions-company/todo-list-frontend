import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import {useRouter} from 'next/router';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import TodoListLogo from '@/components/icons/todolist-logo';
import useMediaQuery from '@/hooks/useMediaQuery';

import styles from './style.module.scss';

interface IFormData {
  user_name: string;
}

const Schema = yup.object({
  user_name: yup
    .string()
    .required('This field is required.')
    .max(20, 'Should smaller than 20 charaters.')
    .min(2, 'Shuold bigger than 2 charaters.')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field.')
});

const QuickPlay: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitted, isValid}
  } = useForm<IFormData>({
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormData> = data => {
    API.createUser(data);
    localStorage.setItem('user_name', data.user_name);
    router.push('/action');
  };

  const matches = useMediaQuery('(min-width:640px)');

  // Set state for form
  let stateForm = true;

  if (isSubmitted == true && isValid == false) {
    stateForm = false;
  }

  return (
    <div className={cn(styles['section-todo-list'], stateForm ? '' : styles.validation)}>
      <div className="container">
        <div className="inner">
          <div className="logo-wrapper">
            <TodoListLogo width={matches ? 249 : 175} />
          </div>
          <div className="enter-your-name">
            <h2 className="heading">Let&apos;s start !</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('user_name')}
                className="w-full"
                id="outlined-basic"
                label="Enter your name"
                variant="outlined"
              />
              <span>{errors.user_name?.message}</span>
              <Button className="btn-enter" variant="contained">
                Enter
              </Button>
            </form>
          </div>
          <div className="copyright">Copyright © 2022 By ABC Software Solutions Company.</div>
        </div>
      </div>
    </div>
  );
};

export default QuickPlay;
