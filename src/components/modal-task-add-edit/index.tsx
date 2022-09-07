import {yupResolver} from '@hookform/resolvers/yup';
import cls from 'classnames';
import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API, {ITask} from '@/api/network/task';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';

import styles from './style.module.scss';

interface IProps {
  data: ITask;
  open: boolean;
  todoListId?: string;
  onSave?: () => void;
  onCancel?: () => void;
}

interface IFormInputs {
  name: string;
  todoListId?: number;
  userId?: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your task name.')
});
const FORM_DEFAULT_VALUES = {
  name: ''
};

const ModalTaskAddEdit: FC<IProps> = ({data, open, todoListId, onSave, onCancel}) => {
  const {register, handleSubmit, reset, setValue, formState} = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });
  const toast = useToast();
  const {errors} = formState;

  const getTask = (id: string) => {
    API.getTask(id).then(res => {
      const resp = res.data as ITask;
      setValue('name', resp.name);
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = userObject.id;

    formData.todoListId = Number(todoListId);
    formData.userId = userId;

    if (data?.id) {
      API.updateTask(data.id, formData).then(() => {
        onSave?.();
        toast.show({type: 'success', title: 'Update To-Do', content: 'Successful!'});
      });
    } else {
      API.createTask(formData).then(() => {
        onSave?.();
        toast.show({type: 'success', title: 'Create To-Do', content: 'Successful!'});
      });
    }
  };

  useEffect(() => {
    if (data?.id) getTask(data.id);
    else {
      reset(FORM_DEFAULT_VALUES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal
      className={cls(styles['com-modal-task-add-edit'], 'max-w-3xl')}
      variant="center"
      open={open}
      onClose={() => onCancel?.()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <h3 className="title">{data?.id ? 'Update To-Do' : 'Add New To-Do'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Input error={errors.name?.message} {...register('name')} placeholder="Enter your to-do" />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full gap-x-3">
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

export default ModalTaskAddEdit;
