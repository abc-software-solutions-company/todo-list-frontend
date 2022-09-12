import {yupResolver} from '@hookform/resolvers/yup';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo';
import Seo from '@/components/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import {ThemeContext} from '@/hooks/useAuthContext';
import LayoutDefault from '@/layouts/default';

import styles from './style.module.scss';

interface IFormInputs {
  todoId: string;
}

const Schema = yup.object().shape({
  todoId: yup.string().required('Please enter your room id')
});

export default function Action() {
  const router = useRouter();
  const toast = useToast();
  const userObject = useContext(ThemeContext);

  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const todoId = data.todoId.toLowerCase();
    API.getTodo(todoId)
      .then(res => {
        toast.show({type: 'success', title: 'Success', content: 'Join List Successfull', lifeTime: 3000});
        if (res.status == 200) router.push(`${ROUTES.TODO_LIST}/${todoId}`);
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error!', content: 'Room not found.', lifeTime: 3000});
      });
  };

  useEffect(() => {
    if (userObject.id === '') {
      router.push(ROUTES.QUICKPLAY);
    }
    if (localStorage.getItem('listID')) {
      localStorage.removeItem('listID');
    }
  }, [errors]);

  if (userObject.id !== '')
    return (
      <>
        <Seo title={`${siteSettings.name} | Action Page`} description={siteSettings.description} />
        <div className={styles['page-action']}>
          <div className="container">
            <div className="inner">
              <p className="title">TO-DO LIST</p>
              <p className="h1">Organize your work and life, finally.</p>
              <div className="actions">
                <div className="item">
                  <Button
                    variant="contained"
                    className="w-full font-medium"
                    color="primary"
                    onClick={() => {
                      localStorage.setItem('createNewList', '1');
                      router.push(ROUTES.TODO_LIST);
                    }}
                  >
                    Create New List
                  </Button>
                </div>
                <div className="item">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      groupEnd={
                        <Button
                          className="px-5 font-medium "
                          color="primary"
                          variant="contained"
                          text="Join"
                          type="submit"
                        />
                      }
                      placeholder="Enter Link or ID"
                      error={errors.todoId?.message}
                      {...register('todoId')}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

Action.Layout = LayoutDefault;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const translate = await serverSideTranslations(locale!, ['common']);

  return {
    props: {
      ...translate
    }
  };
};
