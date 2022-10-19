import cls from 'classnames';
import {FC} from 'react';
import {Controller} from 'react-hook-form';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {IListResponse} from '@/data/api/types/list.type';

import useModalCreateUpdateList from './hook';
import styles from './style.module.scss';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  data?: IListResponse;
}

const ModalCreateUpdateList: FC<IProps> = prop => {
  const {open, onClose, data} = prop;
  const {onSubmit, control, errors, isSubmitting} = useModalCreateUpdateList(prop);
  return (
    <>
      {open && (
        <Modal className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')} variant="center" open={open} onClose={onClose}>
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">{data ? 'Update List' : 'Create New List'}</h3>
            </Modal.Header>
            <Modal.Body>
              <Controller
                name="name"
                control={control}
                rules={{required: true}}
                render={({field}) => <Input {...field} placeholder="Enter your list name" error={errors.name?.message} value={data?.name} autoFocus />}
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="flex w-full gap-x-3 md:gap-x-4">
                <Button className="w-full" variant="outlined" color="primary" text="Cancel" onClick={onClose} type="button" />
                <Button
                  className="w-full"
                  variant="contained"
                  color="primary"
                  text={data?.id ? 'Save' : 'Create'}
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

export default ModalCreateUpdateList;
