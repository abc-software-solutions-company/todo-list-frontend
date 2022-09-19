import {yupResolver} from '@hookform/resolvers/yup';
import cls from 'classnames';
import React, {FC, useCallback, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo';
import {ITodo} from '@/api/types/todo.type';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';

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
  const inputRef = useCallback((node: HTMLInputElement) => {
    if (node) node.focus();
  }, []);
  const {handleSubmit, setValue, reset, control, formState} = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });
  const toast = useToast();
  const {errors} = formState;

  const getTodo = (id: string) => {
    API.getTodo(id).then(res => {
      const resp = res.data as ITodo;
      setValue('name', resp.name);
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    if (data?.id) {
      API.updateTodo(data.id, formData)
        .then(() => {
          toast.show({type: 'success', title: 'Update List', content: 'Successful!'});
          onSave?.();
        })
        .catch(() => {
          toast.show({type: 'danger', title: 'Update List', content: 'Error, Cannot update List'});
        });
    } else {
      API.createTodo(formData)
        .then(() => {
          toast.show({type: 'success', title: 'Create List', content: 'Successful!'});
          onSave?.();
        })
        .catch(() => {
          toast.show({type: 'danger', title: 'Create List', content: 'Error, Cannot create List'});
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
      className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')}
      variant="center"
      open={open}
      onClose={() => onCancel?.()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <h3 className="title">{data?.id ? 'Update List' : 'Create New List'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Controller
            name="name"
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <Input
                {...field}
                placeholder="Enter your list name"
                error={errors.name?.message}
                ref={inputRef}
                onKeyPress={e => {
                  if (e.key === 'Enter') handleSubmit(onSubmit);
                }}
              />
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full gap-x-3 md:gap-x-4">
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
