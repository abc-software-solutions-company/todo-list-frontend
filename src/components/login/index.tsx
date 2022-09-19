import cn from 'classnames';
import React from 'react';

import TodoListLogo from '@/components/icons/todolist-logo';
import Seo from '@/components/seo/seo';
import {siteSettings} from '@/configs/site.config';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useIndexHook from '@/hooks/page/index.hook';
import LayoutDefault from '@/layouts/default';

import styles from './style.module.scss';

export default function Login() {
  const {onSubmit, matches, register, handleSubmit, errors} = useIndexHook();
  return (
    <>
      <Seo title={`${siteSettings.name} | Quick Play`} description={siteSettings.description} />
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
                // Explain: Don't worry about 33 character Because IUse max length 33 to trigger yup validation 32 character message
                {...register('userName')}
                error={errors.userName?.message}
              />
              <Button className="btn-submit" variant="contained" color="primary" type="submit" text="Enter" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

Login.Layout = LayoutDefault;
