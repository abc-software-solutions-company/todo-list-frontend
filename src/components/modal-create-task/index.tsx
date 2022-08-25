import React from 'react';
import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';
import API from '@/api/network/task';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './style.module.scss';

const Schema = yup.object().shape({
  taskName: yup
    .string()
    .required('Please enter your task name.')
    .max(100, 'Task name should be less than 100 characters.')
    .min(5, 'Task name must be at least 5 characters.')
});

interface IFormInputs {
  taskName: string;
  userId?: string;
  todolistId?: number;
}

const FORM_DEFAULT_VALUES: IFormInputs = {
  taskName: ''
};

interface IProps {
  open: boolean;
  onClose?: () => void;
}

interface IProps {
  open: boolean;
  onClose?: () => void;
  userId?: string;
  todolistId?: number;
}

const ModalCreateTask: React.FC<IProps> = ({userId, todolistId, open, onClose}) => {
  // Use React Hook Form.
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    data.userId = userId;
    data.todolistId = Number(todolistId);

    // Create task.
    API.createTask(data)
      .then(res => {
        if (res.status === 201) {
          window.location.reload();
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className={styles['com-modal-create-task']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Create New task</h3>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <input
              className="input"
              type="text"
              placeholder="Enter your Task"
              {...register('taskName', {required: true})}
            />
            {errors.taskName && <p>{errors.taskName.message}</p>}
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

export default ModalCreateTask;
