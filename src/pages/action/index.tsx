import {yupResolver} from '@hookform/resolvers/yup';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import LayoutDefault from '@/layouts/default';

import styles from './style.module.scss';

interface IFormInputs {
  todoId: string;
}

const Schema = yup.object().shape({
  todoId: yup.string().required('Please enter Link or ID.')
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
        if (res.status == 200) router.push(`${ROUTES.TODO}/${data.todoId}`);
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error!', content: 'Room not found.', lifeTime: 3000});
      });
  };

  const routerList = () => {
    router.push(ROUTES.LIST);
  };

  return (
    <div className={styles['create-room']}>
      <div className="container">
        <div className="inner">
          <p className="title">TO DO LIST</p>
          <p className="headline">Organize your work and life, finally.</p>
          <div className="actions">
            <div className="item">
              <Button variant="contained" className="w-full" color="primary" onClick={routerList}>
                Create New List
              </Button>
            </div>
            <div className="item">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  groupEnd={
                    <Button
                      className="input-group-button"
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
