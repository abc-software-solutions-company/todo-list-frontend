import * as yup from 'yup';
import TaskAPI, {ITask} from '@/api/network/task';
import {FC, useEffect} from 'react';
import {Modal} from '@/core-ui/modal';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import styles from './style.module.scss';

const Schema = yup.object().shape({
  taskName: yup.string().required('Please enter your task name.')
});

interface IFormInputs {
  taskName: string;
  todolistId?: number;
  userId?: string;
}

interface IProps {
  data: ITask;
  onSave?: () => void;
  open: boolean;
  todolistId?: number;
  userId?: string;
}

const ModalTaskAddEdit: FC<IProps> = ({data, open, onSave, todolistId, userId}) => {
  const {register, handleSubmit, setValue, formState} = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    formData.todolistId = Number(todolistId);
    formData.userId = userId;

    if (data?.id) {
      TaskAPI.updateTask(data.id, formData).then(() => onSave?.());
    } else {
      TaskAPI.createTask(formData).then(() => onSave?.());
    }
  };

  useEffect(() => {
    if (data?.id) {
      setValue('taskName', data.taskName);
    }
  }, [data]);

  return (
    <div className={styles['com-modal-task-add-edit']}>
      <Modal onClose={onSave} open={open}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <h3 className="title">{data?.id ? 'Update task' : 'Add New To-Do'}</h3>
          </Modal.Header>
          <Modal.Body>
            <input className="form-input" placeholder="Enter your task" type="text" {...register('taskName')} />
            {errors.taskName && <p>{errors.taskName.message}</p>}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-cancel" onClick={onSave}>
              Cancel
            </button>
            <button className="btn btn-submit" type="submit">
              {data?.id ? 'Save' : 'Add New'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalTaskAddEdit;
