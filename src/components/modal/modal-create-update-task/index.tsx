import cls from 'classnames';
import {FC, useEffect} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {ITodolistResponse} from '@/data/api/types/list.type';
import {ITaskResponse} from '@/data/api/types/task.type';

import useModalCreateUpdateTask from './hook';
import styles from './style.module.scss';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  taskData?: ITaskResponse;
  listData: ITodolistResponse;
}
const ModalCreateUpdateTask: FC<IProps> = props => {
  const {open, onClose, taskData} = props;
  const {onSubmit, register, errors, setValue, isSubmitting} = useModalCreateUpdateTask(props);

  useEffect(() => {
    setValue('name', taskData?.name || '');
  }, [taskData, setValue]);

  return (
    <>
      {open && (
        <Modal className={cls(styles['com-modal-task-add-edit'], 'max-w-xl')} variant="center" open={open} onClose={onClose}>
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">{taskData?.todolistId ? 'Update Task' : 'Add New Task'}</h3>
            </Modal.Header>
            <Modal.Body>
              <Input error={errors.name?.message} autoFocus={true} placeholder={'Enter your list name'} {...register('name', {value: taskData?.name})} />
            </Modal.Body>
            <Modal.Footer>
              <div className="content">
                <Button className="w-full" variant="outlined" color="primary" text="Cancel" onClick={onClose} type="button" />
                <Button
                  className="w-full"
                  variant="contained"
                  color="primary"
                  text={taskData ? 'Save' : 'Create'}
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ModalCreateUpdateTask;
