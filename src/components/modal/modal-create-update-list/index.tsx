import cls from 'classnames';
import {Dispatch, FC, SetStateAction} from 'react';
import {Controller} from 'react-hook-form';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {IListResponse} from '@/data/api/types/list.type';

import useModalCreateUpdateList from './hook';
import styles from './style.module.scss';

export interface IProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  data?: IListResponse;
}

const ModalCreateUpdateList: FC<IProps> = prop => {
  const {modalOpen, setModalOpen, data} = prop;
  const {onSubmit, control, formState} = useModalCreateUpdateList(prop);
  const {errors, isSubmitting} = formState;
  return (
    <>
      {modalOpen && (
        <Modal className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')} variant="center" open={modalOpen} onClose={() => setModalOpen(false)}>
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">{data ? 'Update List' : 'Create New List'}</h3>
            </Modal.Header>
            <Modal.Body>
              <Controller
                name="name"
                control={control}
                rules={{required: true}}
                render={({field}) => <Input {...field} placeholder="Enter your list name" error={errors.name?.message} value={data?.name} />}
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="flex w-full gap-x-3 md:gap-x-4">
                <Button className="w-full" variant="outlined" color="primary" text="Cancel" onClick={() => setModalOpen(false)} type="button" />
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
