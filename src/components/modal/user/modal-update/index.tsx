import cls from 'classnames';
import {FC} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {IUserResponse} from '@/data/api/types/user.type';

import useModalUpdateUser from './hook';
import styles from './style.module.scss';

export interface IProps {
  data?: IUserResponse;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ModalUpdateUser: FC<IProps> = props => {
  const {data, open, onClose} = props;
  const {errors, isSubmitting, onSubmit, register} = useModalUpdateUser(props);

  return (
    <>
      {open && (
        <Modal
          className={cls(styles['com-modal-update-user'], 'max-w-xl')}
          variant="center"
          open={open}
          onClose={onClose}
        >
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">Edit name</h3>
            </Modal.Header>
            <Modal.Body>
              <Input
                error={errors.name?.message}
                autoFocus={true}
                placeholder={'Enter your name'}
                {...register('name', {value: data?.name})}
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="content">
                <Button
                  className="w-full"
                  variant="outlined"
                  color="primary"
                  text="Cancel"
                  onClick={onClose}
                  type="button"
                />
                <Button
                  className="w-full"
                  variant="contained"
                  color="primary"
                  text="Save"
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

export default ModalUpdateUser;
