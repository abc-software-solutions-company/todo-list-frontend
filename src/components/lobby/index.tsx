import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo';
import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';
import detectIdOrLink from '@/utils/detect-id-or-link';

import styles from './style.module.scss';

interface IFormInputs {
  todoId: string;
}

const Schema = yup.object().shape({
  todoId: yup.string().required('Please enter Link or ID')
});

export default function Lobby() {
  const router = useRouter();
  const toast = useToast();
  const [action, setAction] = useState<IAction>({type: '', payload: null});

  const resetAction = () => setAction({type: '', payload: null});
  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });
  const {errors} = formState;

  const getTodoCreated = () => {
    API.getLastTodo().then(res => {
      const id = res.data.id;
      router.push(`${ROUTES.LIST_DETAIL}/${id}`);
    });
  };

  const reset = () => {
    getTodoCreated();
    resetAction();
  };

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const todoId = detectIdOrLink(data.todoId);
    // Check if it contain space character only
    if (todoId.trim().length == 0) {
      toast.show({type: 'danger', title: 'Error!', content: 'List not found', lifeTime: 3000});
    } else {
      API.getTodo(todoId.trim())
        .then(() => {
          toast.show({type: 'success', title: 'Success', content: 'Join List Successfull', lifeTime: 3000});
          router.push(`${ROUTES.LIST_DETAIL}/${todoId}`);
        })
        .catch(() => {
          toast.show({type: 'danger', title: 'Error!', content: 'List not found', lifeTime: 3000});
        });
    }
  };

  return (
    <>
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
                      disabled={formState.isSubmitting}
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
      {['add'].includes(action.type) && (
        <ModalTodoAddEdit data={action.payload} open={true} onSave={() => reset()} onCancel={resetAction} />
      )}
    </>
  );
}

Lobby.Layout = LayoutDefault;
