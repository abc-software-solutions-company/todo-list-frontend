import {yupResolver} from '@hookform/resolvers/yup';
import cn from 'classnames';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/user';
import TodoListLogo from '@/components/icons/todolist-logo';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useMediaQuery from '@/hooks/useMediaQuery';

import styles from './style.module.scss';

interface IFormInputs {
  userName: string;
}

const Schema = yup.object().shape({
  userName: yup.string().required('Please fill your name.')
});

const QuickPlay: React.FC = () => {
  const router = useRouter();

  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  useEffect(() => {
    localStorage.setItem('toast', 'close');
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.createUser(data)
      .then(res => {
        if (res.status === 201) {
          localStorage.setItem('user', JSON.stringify(res.data, null, 2));
          localStorage.setItem('modalCreateList', 'close');
          localStorage.setItem('toast', 'close');
          router.push(ROUTES.ACTION);
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);

        // alert(error.response.data.message);
      });
  };

  const matches = useMediaQuery('(min-width:640px)');

  return (
    <div className={cn(styles['com-action'])}>
      <div className="container">
        <div className="inner">
          <div className="logo-wrapper">
            <TodoListLogo width={matches ? 249 : 175} />
          </div>
          <div className="enter-your-name">
            <h2>Let&apos;s start!</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input className={errors.userName && 'error'} placeholder="Enter your name" {...register('userName')} />
              {errors.userName && <p className="invalid">{errors.userName.message}</p>}
              <Button className="btn-submit" type="submit" variant="contained">
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
