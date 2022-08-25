import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '@/api/network/todo-list';
import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';
import styles from './style.module.scss';

const Schema = yup.object().shape({
  listName: yup
    .string()
    .required('Please enter your list name.')
    .max(50, 'Task name should be less than 50 characters.')
    .min(5, 'Task name must be at least 5 characters.')
});

interface IFormInputs {
  listName: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {
  listName: ''
};

interface IProps {
  open: boolean;
  onClose?: () => void;
}

const ModalCreateList: React.FC<IProps> = ({open, onClose}) => {
  // Use React Hook Form.
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.createTodoList(data)
      .then(res => {
        if (res.status === 201) {
          localStorage.setItem('listName', data.listName);
          window.location.reload();
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className={styles['com-modal-create-list']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Create New list</h3>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <input
              className="input"
              type="text"
              placeholder="Enter your list"
              {...register('listName', {required: true})}
            />
            {errors.listName && <p>{errors.listName.message}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn" text="Cancel" theme="white" onClick={onClose} />
            <Button className="btn" text="Create" type="submit" />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalCreateList;
