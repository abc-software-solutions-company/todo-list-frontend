import cn from 'classnames';
import React, {FC, useEffect} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {AuthActions} from '@/states/auth';
import {useDispatchAuth} from '@/states/auth/context';
import LocalStorage from '@/utils/local-storage';

import ABC_Logo from '../common/icons/todolist-logo';
import ModalThirdPartyLogin from '../modal/modal-third-party-login';
import useGuestLoginHook from './hooks';
import styles from './style.module.scss';

const Login: FC = () => {
  const {formState, modalOpen, onSubmit, register, setModalOpen} = useGuestLoginHook();
  const {errors, isSubmitting} = formState;
  const dispatchAuth = useDispatchAuth();
  useEffect(() => {
    dispatchAuth(AuthActions.login(undefined));
    LocalStorage.accessToken.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cn(styles['com-quick-play'])}>
        <div className="container">
          <div className="inner">
            <form onSubmit={onSubmit}>
              <div className="logo-wrapper">
                <ABC_Logo width={149} />
              </div>
              <div className="welcome">
                <h2>Welcome to To-do list 🖐️</h2>
                <p>Please sign-in and start</p>
              </div>

              <Input placeholder="Enter your name" className="name-input" maxLength={33} error={errors.name?.message} {...register('name')} />
              <Button className="btn-submit" variant="contained" color="primary" type="submit" text="LOGIN" loading={isSubmitting} disabled={isSubmitting} />
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
      <ModalThirdPartyLogin open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Login;
