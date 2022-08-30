import {yupResolver} from '@hookform/resolvers/yup';
import React, {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API, {ITodo} from '@/api/network/todo-list';
import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';

interface IProps {
  data: ITodo;
  open: boolean;
  onSave?: () => void;
}

interface IFormInputs {
  listName: string;
}

const Schema = yup.object().shape({
  listName: yup.string().required()
});

const ModalAddEditTodoList: FC<IProps> = ({data, open, onSave}) => {
  const {register, handleSubmit, setValue, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    if (data?.id) {
      API.updateTodoList(data.id, formData).then(() => onSave?.());
    } else {
      API.createTodoList(formData).then(() => onSave?.());
    }
  };

  const {errors} = formState;

  const getTodo = (id: any) => {
    API.readTodoList(id).then(res => {
      const resp = res.data as ITodo;
      setValue('listName', resp.listName);
    });
  };

  useEffect(() => {
    if (data?.id) {
      getTodo(data.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal open={open} onClose={onSave}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>{data?.id ? 'Edit Post' : 'Add Post'}</Modal.Header>
        <Modal.Body>
          <input className="form-input" {...register('listName')} placeholder="Title" />
          {errors.listName && <p>{errors.listName.message}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="contained" color="primary" text="Save" />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddEditTodoList;
