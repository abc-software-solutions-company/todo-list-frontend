import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import {useRouter} from 'next/router';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/user';
import TodoListLogo from '@/components/icons/todolist-logo';
import useMediaQuery from '@/hooks/useMediaQuery';

import styles from './style.module.scss';

interface IFormInputs {
  userName: string;
}

const Schema = yup.object().shape({
  userName: yup
    .string()
    .required('This field is required.')
    .max(20, 'Should smaller than 20 charaters.')
    .min(2, 'Should bigger than 2 charaters.')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field.')
});

const QuickPlay: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data);
    API.createUser(data).then(res => {
      if (res.status === 201) {
        localStorage.setItem('userName', data.userName);
        router.push('/action');
      }
    });
  };

  const matches = useMediaQuery('(min-width:640px)');

  return (
    <div className={cn(styles['section-todo-list'])}>
      <div className="container">
        <div className="inner">
          <div className="logo-wrapper">
            <TodoListLogo width={matches ? 249 : 175} />
          </div>
          <div className="enter-your-name">
            <h2 className="heading">Let&apos;s start !</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                className="w-full"
                placeholder="Enter your name"
                variant="outlined"
                {...register('userName')}
              />
              {errors.userName && <p>{errors.userName.message}</p>}
              <Button className="btn-enter" type="submit" variant="contained">
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
