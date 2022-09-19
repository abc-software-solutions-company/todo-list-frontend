import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import Seo from '@/components/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';
import {useStateAuth} from '@/contexts/auth/context';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';
import checkUnAuthorized from '@/utils/check-unauthorized';
import detectIdOrLink from '@/utils/detect-id-or-link';

import styles from './style.module.scss';

interface IFormInputs {
  todoId: string;
}

const Schema = yup.object().shape({
  todoId: yup.string().required('Please enter Link or ID')
});
checkUnAuthorized();

export default function Lobby() {
  const router = useRouter();
  const toast = useToast();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const auth = useStateAuth();

  const resetAction = () => setAction({type: '', payload: null});
  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });
  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const todoId = detectIdOrLink(data.todoId);
    console.log('🚀 ~ file: index.tsx ~ line 48 ~ Lobby ~ todoId', todoId);

    API.getTodo(todoId).then(res => {
      if (res.status == 200) {
        toast.show({type: 'success', title: 'Success', content: 'Join List Successfull', lifeTime: 3000});
        router.push(`${ROUTES.LIST}/${todoId}`);
      } else {
        toast.show({type: 'danger', title: 'Error!', content: 'List not found.', lifeTime: 3000});
      }
    });
  };

  return (
    <>
      <Seo title={`${siteSettings.name} | Lobby Page`} description={siteSettings.description} />
      {auth.user && (
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
                    onClick={() => setAction({type: 'add', payload: null})}
                    text=" Create New List"
                  />
                </div>
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
      )}
      {['add'].includes(action.type) && (
        <ModalTodoAddEdit
          data={action.payload}
          open={true}
          onSave={() => router.push(ROUTES.LIST)}
          onCancel={resetAction}
        />
      )}
    </>
  );
}

Lobby.Layout = LayoutDefault;
