import {MenuItem, Select} from '@mui/material';
import cls from 'classnames';
import {FC} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {Visibilities} from '@/utils/constant';

import useModalCreateUpdateList from './hook';
import styles from './style.module.scss';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  data?: ITodolistResponse;
}

const ModalCreateUpdateList: FC<IProps> = prop => {
  const {open, onClose, data} = prop;
  const {onSubmit, register, errors, isSubmitting} = useModalCreateUpdateList(prop);

  return (
    <>
      {open && (
        <Modal className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')} variant="center" open={open} onClose={onClose}>
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">{data ? 'Settings' : 'Create New List'}</h3>
            </Modal.Header>
            <Modal.Body>
              <Input error={errors.name?.message} value={data?.name} autoFocus={true} placeholder={'Enter your list name'} {...register('name')} />
              {data && (
                <Select
                  {...register('visibility')}
                  className="input-type"
                  defaultValue={data?.visibility ? data.visibility : Visibilities.PUBLIC}
                  sx={{fontFamily: 'inherit', color: '#334155'}}
                >
                  {Object.keys(Visibilities).map((key, idx) => {
                    return (
                      <MenuItem key={key} value={key} sx={{fontFamily: 'inherit'}}>
                        {Object.values(Visibilities)[idx]}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </Modal.Body>
            <Modal.Footer>
              <div className="content">
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
