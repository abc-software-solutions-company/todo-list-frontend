import cls from 'classnames';
import {FC} from 'react';
import {Controller} from 'react-hook-form';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {IListResponse} from '@/data/api/types/list.type';
import {ITaskResponse} from '@/data/api/types/task.type';

import useModalCreateUpdateTask from './hook';
import styles from './style.module.scss';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  taskData?: ITaskResponse;
  listData: IListResponse;
}
const ModalCreateUpdateTask: FC<IProps> = props => {
  const {open, onClose, taskData} = props;
  const {onSubmit, control, errors, isSubmitting} = useModalCreateUpdateTask(props);

  return (
    <>
      {open && (
        <Modal className={cls(styles['com-modal-task-add-edit'], 'max-w-xl')} variant="center" open={open} onClose={onClose}>
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">{taskData?.todoListId ? 'Update To-Do' : 'Add New To-Do'}</h3>
            </Modal.Header>
            <Modal.Body>
              <Controller
                name="name"
                control={control}
                rules={{required: true}}
                render={({field}) => <Input {...field} error={errors.name?.message} placeholder="Enter your to-do" />}
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="flex w-full gap-x-3 md:gap-x-4">
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
