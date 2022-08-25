import Button from '@/core-ui/button';
import API from '@/api/network/task';
import Modal from '@/core-ui/modal';
import React from 'react';
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
  taskID?: string;
  taskName: string;
}

interface IProps {
  open: boolean;
  onClose?: () => void;
  taskId?: string;
  taskName?: string;
}

const ModalUpdateList: React.FC<IProps> = ({taskId, taskName, open, onClose}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    data.taskID = taskId;

    if (data.taskID) {
      API.updateTask(data.taskID, data).then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className={styles['com-modal-update-task']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Update task</h3>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <input className="hidden" type="text" {...register('taskID')} />
            <input className="input" type="text" placeholder={taskName} {...register('taskName', {required: true})} />
            {errors.taskName && <p>{errors.taskName.message}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn" text="Close" theme="white" type="reset" onClick={onClose} />
            <Button className="btn" text="Save" type="submit" />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUpdateList;
