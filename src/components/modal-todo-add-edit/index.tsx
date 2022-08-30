import * as yup from 'yup';
import Button from '@/core-ui/button';
import API, {ITodo} from '@/api/network/todo-list';
import React, {FC, useEffect} from 'react';
import {Modal} from '@/core-ui/modal';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import styles from './style.module.scss';

interface IProps {
  data: ITodo;
  open: boolean;
  onCancel?: () => void;
  onSave?: () => void;
}

interface IFormInputs {
  listName: string;
}

const Schema = yup.object().shape({
  listName: yup.string().required()
});

const ModalAddEditTodoList: FC<IProps> = ({data, open, onCancel, onSave}) => {
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
    <div className={styles['com-modal-todo-add-edit']}>
      <Modal open={open} onClose={onSave}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <h3 className="title">{data?.id ? 'Update list' : 'Create New List'}</h3>
          </Modal.Header>
          <Modal.Body>
            <input className="form-input" {...register('listName')} placeholder="Enter your list" />
            {errors.listName && <p>{errors.listName.message}</p>}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-cancel" type="button" onClick={onCancel}>
              Cancel
            </button>
            <Button className="btn" type="submit" variant="contained" color="primary" text="Save" />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalAddEditTodoList;
