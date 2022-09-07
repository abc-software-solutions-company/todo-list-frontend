import {yupResolver} from '@hookform/resolvers/yup';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo';
import Seo from '@/components/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import LayoutDefault from '@/layouts/default';

import styles from './style.module.scss';

interface IFormInputs {
  todoId: string;
}

const Schema = yup.object().shape({
  todoId: yup.string().required(' ')
});

export default function Action() {
  const router = useRouter();
  const toast = useToast();

  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.getTodo(data.todoId)
      .then(res => {
        if (res.status == 200) router.push(`${ROUTES.TODO_LIST}/${data.todoId}`);
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error!', content: 'Room not found.', lifeTime: 3000});
      });
  };

  useEffect(() => {
    if (errors.todoId?.message) {
      toast.show({type: 'danger', title: 'Error!', content: 'Please enter Link or ID.', lifeTime: 3000});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <>
      <Seo title={`${siteSettings.name} | Action Page`} description={siteSettings.description} />
      <div className={styles['page-action']}>
        <div className="container">
          <div className="inner">
            <p className="title">TO DO LIST</p>
            <p className="headline">Organize your work and life, finally.</p>
            <div className="actions">
              <div className="item">
                <Button
                  variant="contained"
                  className="w-full"
                  color="primary"
                  onClick={() => router.push(ROUTES.TODO_LIST)}
                >
                  Create New List
                </Button>
              </div>
              <div className="item">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    groupEnd={
                      <Button
                        className="btn-join input-group-text"
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
