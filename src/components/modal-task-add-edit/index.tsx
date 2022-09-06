import {yupResolver} from '@hookform/resolvers/yup';
import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API, {ITask} from '@/api/network/task';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';

import styles from './style.module.scss';

interface IProps {
  data: ITask;
  open: boolean;
  listId?: string;
  onSave?: () => void;
  onCancel?: () => void;
}

interface IFormInputs {
  name: string;
  todolistId?: number;
  userId?: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your task name.')
});

const ModalTaskAddEdit: FC<IProps> = ({data, open, listId, onSave, onCancel}) => {
  const {register, handleSubmit, setValue, formState} = useForm<IFormInputs>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  const getTask = (id: string) => {
    API.getTask(id).then(res => {
      const resp = res.data as ITask;
      setValue('name', resp.name);
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    const userObject = JSON.parse(localStorage.getItem('user'));
    const userId = userObject.id;

    formData.todolistId = Number(listId);
    formData.userId = userId;

    if (data?.id) {
      API.updateTask(data.id, formData).then(() => onSave?.());
    } else {
      API.createTask(formData).then(() => onSave?.());
    }
  };

  useEffect(() => {
    if (data?.id) getTask(data.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal className={styles['com-modal-task-add-edit']} variant="center" open={open} onClose={() => onCancel?.()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <h3 className="title">{data?.id ? 'Update To-Do' : 'Add New To-Do'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Input error={errors.name?.message} {...register('name')} placeholder="Enter your task" />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full gap-x-3 md:gap-x-5">
            <Button
              className="btn btn-cancel"
              variant="contained"
              color="blue"
              text="Cancel"
              onClick={() => onCancel?.()}
              type="button"
            />
            <Button
              className="btn btn-create"
              variant="contained"
              color="white"
              text={data?.id ? 'Save' : 'Add New'}
              type="submit"
            />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalTaskAddEdit;
