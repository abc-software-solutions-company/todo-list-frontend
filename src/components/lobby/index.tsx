import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import ModalTodoAddEdit from '@/components/modal-todo-add-edit';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import API from '@/data/api';
import LayoutDefault from '@/layouts/default';
import {IAction} from '@/types';
import detectIdOrLink from '@/utils/detect-id-or-link';

import LobbyTitle from '../lobby-title';
import styles from './style.module.scss';

interface IFormInputs {
  listId: string;
}

const Schema = yup.object().shape({
  listId: yup.string().required('Please enter Link or ID')
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

  const reset = () => resetAction();

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const id = detectIdOrLink(data.listId).trim();
    API.list
      .getOne({id})
      .then(res => {
        toast.show({type: 'success', title: 'Success', content: 'Join List Successfull', lifeTime: 3000});
        console.log(res.data);

        // router.push(`${ROUTES.LIST}/${id}`);
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error!', content: 'List not found', lifeTime: 3000});
      });
  };

  return (
    <>
      <div className={styles['page-action']}>
        <div className="container">
          <div className="inner">
            <LobbyTitle />
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
                  error={errors.listId?.message}
                  {...register('listId')}
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
