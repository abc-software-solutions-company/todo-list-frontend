import {yupResolver} from '@hookform/resolvers/yup';
import React, {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API, {ITodo} from '@/api/network/todo';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';

import styles from './style.module.scss';

interface IProps {
  data: ITodo;
  open: boolean;
  onCancel?: () => void;
  onSave?: () => void;
}

interface IFormInputs {
  name: string;
  userId?: string | null;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});

const ModalTodoAddEdit: FC<IProps> = ({data, open, onCancel, onSave}) => {
  const {register, handleSubmit, setValue, formState} = useForm<IFormInputs>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  const getTodo = (id: string) => {
    API.getTodo(id).then(res => {
      const resp = res.data as ITodo;
      setValue('name', resp.name);
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    const userObject = JSON.parse(localStorage.getItem('user'));
    const userId = userObject.id;

    if (data?.id) {
      API.updateTodo(data.id, formData).then(() => onSave?.());
    } else {
      formData.userId = userId;
      API.createTodo(formData).then(() => onSave?.());
    }
  };

  useEffect(() => {
    if (data?.id) getTodo(data.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!open) return null;

  return (
    <Modal className={styles['com-modal-todo-add-edit']} variant="center" open={open} onClose={() => onCancel?.()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <h3 className="title">{data?.id ? 'Update list' : 'Create New List'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Input error={errors.name?.message} {...register('name')} placeholder="Enter your list" />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full gap-x-3 md:gap-x-5">
            <Button variant="contained" color="blue" text="Cancel" onClick={() => onCancel?.()} type="button" />
            <Button variant="contained" color="white" text="Create" type="submit" />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalTodoAddEdit;
