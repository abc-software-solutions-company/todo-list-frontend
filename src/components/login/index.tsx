import cn from 'classnames';
import React, {FC, useEffect} from 'react';

import TodoListLogo from '@/components/icons/todolist-logo';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useMediaQuery from '@/hooks/useMediaQuery';
import {AuthActions} from '@/states/auth';
import {useDispatchAuth} from '@/states/auth/context';
import LocalStorage from '@/utils/local-storage';

import ModalSocial from '../modal-social';
import useGuestLoginHook from './hook';
import styles from './style.module.scss';

const Login: FC = () => {
  const {formState, modalOpen, onSubmit, register, setModalOpen} = useGuestLoginHook();
  const matches = useMediaQuery('(min-width:640px)');
  const {errors, isSubmitting} = formState;
  const dispatchAuth = useDispatchAuth();
  useEffect(() => {
    dispatchAuth(AuthActions.login(undefined));
    LocalStorage.accessToken.remove();
  }, []);

  return (
    <>
      <div className={cn(styles['com-quick-play'])}>
        <div className="container">
          <div className="inner">
            <div className="logo-wrapper">
              <TodoListLogo width={matches ? 249 : 175} />
            </div>
            <form onSubmit={onSubmit}>
              <h2 className="text-center">Let&apos;s start!</h2>
              <Input
                placeholder="Enter your name"
                className="name-input"
                maxLength={33}
                error={errors.name?.message}
                {...register('name')}
              />
              <Button
                className="btn-submit"
                variant="contained"
                color="primary"
                type="submit"
                text="Enter"
                loading={isSubmitting}
                disabled={isSubmitting}
              />
              <Button
                className="btn-submit"
                variant="contained"
                color="primary"
                type="button"
                text="Login With Email"
                onClick={() => setModalOpen(true)}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
      <ModalSocial open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Login;
