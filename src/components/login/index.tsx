import cn from 'classnames';
import React, {FC} from 'react';

import TodoListLogo from '@/components/icons/todolist-logo';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';

import ModalSocial from '../modal-social';
import useGuestLoginHook from './hook';
import styles from './style.module.scss';

const Login: FC = () => {
  const {formState, onSubmit, matches, register, handleSubmit, errors, handleSocial, socialOpen, setSocialOpen} =
    useGuestLoginHook();
  return (
    <>
      <div className={cn(styles['com-quick-play'])}>
        <div className="container">
          <div className="inner">
            <div className="logo-wrapper">
              <TodoListLogo width={matches ? 249 : 175} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-center">Let&apos;s start!</h2>
              <Input
                placeholder="Enter your name"
                className="name-input"
                maxLength={33}
                disabled={formState.isSubmitting}
                error={errors.name?.message}
                {...register('name')}
              />
              <Button
                className="btn-submit"
                variant="contained"
                color="primary"
                type="submit"
                text="Enter"
                loading={formState.isSubmitting}
                disabled={formState.isSubmitting}
              />
              <Button
                className="btn-submit"
                variant="contained"
                color="primary"
                type="button"
                text="Login With Email"
                onClick={() => handleSocial()}
                loading={formState.isSubmitting}
                disabled={formState.isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
      <ModalSocial open={socialOpen} onClose={() => setSocialOpen(false)} />
    </>
  );
};

export default Login;
