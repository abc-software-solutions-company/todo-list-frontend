import {yupResolver} from '@hookform/resolvers/yup';
import cls from 'classnames';
import React, {FC, useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API, {ITodo} from '@/api/network/todo';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';
import {ThemeContext} from '@/hooks/useAuthContext';

import styles from './style.module.scss';

interface IProps {
  data: ITodo;
  open: boolean;
  onCancel?: () => void;
  onSave?: () => void;
}

interface IFormInputs {
  name: string;
  userId?: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});
const FORM_DEFAULT_VALUES = {
  name: ''
};

const ModalTodoAddEdit: FC<IProps> = ({data, open, onCancel, onSave}) => {
  const {register, handleSubmit, setValue, reset, formState} = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });
  const toast = useToast();
  const userObject = useContext(ThemeContext);
  const {errors} = formState;

  const getTodo = (id: string) => {
    API.getTodo(id).then(res => {
      const resp = res.data as ITodo;
      setValue('name', resp.name);
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    const userId = userObject.id;

    formData.userId = userId;

    if (data?.id) {
      API.updateTodo(data.id, formData).then(() => onSave?.());
      toast.show({type: 'success', title: 'Update', content: 'Update successful!'});
    } else {
      formData.userId = userId;
      API.createTodo(formData).then(() => {
        onSave?.();
        toast.show({type: 'success', title: 'Create', content: 'Create successful!'});
      });
    }
  };
  useEffect(() => {
    if (data?.id) {
      getTodo(data.id);
    } else {
      reset(FORM_DEFAULT_VALUES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal
      className={cls(styles['com-modal-todo-add-edit'], 'max-w-3xl')}
      variant="center"
      open={open}
      onClose={() => onCancel?.()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <h3 className="title">{data?.id ? 'Update List' : 'Create New List'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Input
            className="name-enter"
            error={errors.name?.message}
            {...register('name')}
            placeholder="Enter your list name"
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full gap-x-3 md:gap-x-5">
            <Button
              className="w-full"
              variant="outlined"
              color="primary"
              text="Cancel"
              onClick={() => onCancel?.()}
              type="button"
            />
            <Button
              className="w-full"
              variant="contained"
              color="primary"
              text={data?.id ? 'Save' : 'Create'}
              type="submit"
            />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalTodoAddEdit;
