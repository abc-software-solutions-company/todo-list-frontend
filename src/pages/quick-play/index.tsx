import {yupResolver} from '@hookform/resolvers/yup';
import cn from 'classnames';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import React, {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/user';
import TodoListLogo from '@/components/icons/todolist-logo';
import Seo from '@/components/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import {ThemeContext} from '@/hooks/useAuthContext';
import useMediaQuery from '@/hooks/useMediaQuery';
import LayoutDefault from '@/layouts/default';

import styles from './style.module.scss';

interface IFormInputs {
  userName: string;
}

const Schema = yup.object().shape({
  userName: yup.string().required('Please fill your name.')
});

export default function QuickPlay() {
  const userObject = useContext(ThemeContext);

  const router = useRouter();
  const toast = useToast();
  const matches = useMediaQuery('(min-width:640px)');
  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.createUser(data)
      .then(res => {
        if (res.status === 201) {
          localStorage.setItem('userIdSaved', res.data.id);
          if (localStorage.getItem('listID')) {
            router.push(`${ROUTES.TODO_LIST}/${localStorage.getItem('listID')}`);
          } else router.push(ROUTES.WAITING);
        }
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error', content: 'Can&lsquo;t create user.'});
      });
  };

  useEffect(() => {
    if (userObject.id !== '' && !localStorage.getItem('listID')) router.push(ROUTES.ACTION);
  }, [userObject.id]);

  const {errors} = formState;

  return (
    <>
      <Seo title={`${siteSettings.name} | Quick Play`} description={siteSettings.description} />
      <div className={cn(styles['com-quick-play'])}>
        <div className="container">
          <div className="inner">
            <div className="logo-wrapper">
              <TodoListLogo width={matches ? 249 : 175} />
            </div>
            <div className="enter-your-name">
              <h2 className="text-center">Let&apos;s start!</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  placeholder="Enter your name"
                  className="name-input h6"
                  {...register('userName')}
                  error={errors.userName?.message}
                />
                {errors.userName && <p className="invalid">{errors.userName.message}</p>}
                <Button className="btn-submit" variant="contained" color="primary" type="submit">
                  Enter
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

QuickPlay.Layout = LayoutDefault;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'footer']))
    }
  };
};
