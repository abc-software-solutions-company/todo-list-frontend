import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import API from '@/api/network/user';
import TodoListLogo from '@/components/icons/todolist-logo';
import Button from '@/core-ui/button';

import styles from './style.module.scss';

interface IFormData {
  user_name: string;
}

const schema = yup.object({
  user_name: yup
    .string()
    .required('This field is required!')
    .max(20, 'Should smaller than 20 charaters!')
    .min(2, 'Shuold bigger than 2 charaters!')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
});

const QuickPlay: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm<IFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    API.createUser(data);
    localStorage.setItem('user_name', data.user_name);
    router.push('/action');
  };

  // #region scale width SVG
  const [windowWidth, setWindowWidth] = useState(0);

  const update = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  // #endregion
  return (
    <div className={styles['section-todo-list']}>
      <div className="container">
        <div className="inner">
          <div className="logo-wrapper">
            <TodoListLogo width={windowWidth <= 640 ? 175 : 249} />
          </div>
          <div className="enter-your-name">
            <h2 className="heading">Let's start !</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register('user_name')} className="input" placeholder="Enter your name" type="text" />
              <span>{errors.user_name?.message}</span>
              <Button className="btn-enter" text="Enter" type="submit" />
            </form>
          </div>
          <div className="copyright">Copyright © 2022 By ABC Software Solutions Company.</div>
        </div>
      </div>
    </div>
  );
};

export default QuickPlay;
