import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/task';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';

import styles from './style.module.scss';

const Schema = yup.object().shape({
  taskName: yup.string().required('Please enter your task name.')
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
  onClose: () => void;
  userId?: string;
  todolistId?: number;
  fetchData?: () => void;
}

const ModalCreateTask: React.FC<IProps> = ({userId, todolistId, open, onClose, fetchData}) => {
  const toast = useToast();
  // Use React Hook Form.
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitSuccessful, isValid}
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
          toast.show({type: 'info', title: '', content: `You have add task: ${data.taskName}!`, lifeTime: 5000});
          fetchData?.();
        }
      })
      .catch(error => {
        toast.show({type: 'danger', title: '', content: error.response.data.message, lifeTime: 5000});
      });
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <div className={styles['com-modal-create-task']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Create New task</h3>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Input
              className={errors.taskName && 'error'}
              placeholder="Enter your Task"
              {...register('taskName', {required: true})}
            />
            {errors.taskName && <p className="invalid">{errors.taskName.message}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn" text="Cancel" variant="contained" color="primary" onClick={onClose} />
            <Button
              className="btn"
              text="Create"
              variant="contained"
              color="primary"
              type="submit"
              onClick={isValid ? onClose : () => {}}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalCreateTask;
