/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import React, {FC, useEffect} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {AuthActions} from '@/states/auth';
import {useDispatchAuth} from '@/states/auth/context';
import LocalStorage from '@/utils/local-storage';

import ABC_Logo from '../common/icons/todolist-logo';
import useGuestLoginHook from './hooks';
import styles from './style.module.scss';

const Login: FC = () => {
  const {formState, onSubmit, register, openGooglePopUp} = useGuestLoginHook();
  const {errors, isSubmitting} = formState;
  const dispatchAuth = useDispatchAuth();
  useEffect(() => {
    dispatchAuth(AuthActions.login(undefined));
    LocalStorage.accessToken.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles['com-login']}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <form onSubmit={onSubmit} className={styles.form}>
              <div className={styles['logo-wrapper']}>
                <ABC_Logo width={149} />
              </div>
              <div className={styles.welcome}>
                <h2>Welcome to To-do list 🖐️</h2>
                <p>Please sign-in and start</p>
              </div>
              <Input placeholder="Enter your name" className={styles['name-input']} maxLength={33} error={errors.name?.message} {...register('name')} />
              <Button
                className={styles['btn-submit']}
                variant="contained"
                color="info"
                type="submit"
                text="LOGIN"
                loading={isSubmitting}
                disabled={isSubmitting}
              />
              <div className="third-party-login">
                <hr className={styles.or} data-content="or" />
                <div className={styles['login-buttons']}>
                  <div className="github"></div>
                  <div className="google">
                    <Button onClick={openGooglePopUp}>
                      <img src="/google.png" alt="Google Login" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="com-login-decor absolute right-0 bottom-0 -z-10 w-full">
          <div className="backdrop-decor h-24 -rotate-3"></div>
          <div className="tree-decor flex justify-between">
            <div className="left">left tree</div>
            <div className="right">right tree</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
