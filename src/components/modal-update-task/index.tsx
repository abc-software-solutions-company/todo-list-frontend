import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/task';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import Modal from '@/core-ui/modal';

import styles from './style.module.scss';
import useToast from '@/core-ui/toast';

const Schema = yup.object().shape({
  taskName: yup.string().required('Please enter your task name.')
});

interface IFormInputs {
  taskID?: string;
  taskName: string;
}

interface IProps {
  open: boolean;
  onClose?: () => void;
  taskId?: string;
  oldTaskName: string;
}

const ModalUpdateList: React.FC<IProps> = ({taskId, oldTaskName, open, onClose}) => {
  const toast = useToast();

  const {
    handleSubmit,
    formState: {errors, isValid},
    register,
    setValue
  } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    data.taskID = taskId;

    if (data.taskID) {
      API.updateTask(data.taskID, data).then(res => {
        if (res.status === 200) {
          toast.show({type: 'warning', title: '', content: `You have updated sucessful!`, lifeTime: 5000});
        }
      });
    }
  };

  useEffect(() => {
    setValue('taskName', oldTaskName);
  }, [oldTaskName]);
  return (
    <div className={styles['com-modal-update-task']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Update task</h3>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Input className={`input ${errors.taskName && 'error'}`} {...register('taskName', {required: true})} />
            {errors.taskName && <p className="invalid">{errors.taskName.message}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn" text="Close" onClick={onClose} />
            <Button className="btn" text="Save" type="submit" onClick={isValid ? onClose : () => {}} />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUpdateList;
