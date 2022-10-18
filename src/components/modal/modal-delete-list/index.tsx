import cls from 'classnames';
import {useRouter} from 'next/router';
import React, {Dispatch, FC, SetStateAction} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';
import API from '@/data/api';
import {IList} from '@/data/api/types/list.type';

import styles from './style.module.scss';

interface IProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  data: IList;
}

const ModalDeleteList: FC<IProps> = ({modalOpen, setModalOpen, data}) => {
  const router = useRouter();
  const toast = useToast();

  const onClick = () => {
    const {id} = data;
    API.list
      .update({id, isActive: false})
      .then(() => {
        toast.show({type: 'success', title: 'Delete list', content: 'Successful!'});
        if (router.asPath.includes(ROUTES.LIST + '/' + id)) {
          router.push(ROUTES.LIST);
        }
      })
      .catch(() => {
        toast.show({
          type: 'danger',
          title: 'Delete list',
          content: 'Error!, Cannot delete list'
        });
      })
      .finally(() => setModalOpen(false));
  };

  return (
    <Modal className={cls(styles['com-modal-todo-confirm-delete'], 'max-w-xl')} variant="center" open={modalOpen} onClose={() => setModalOpen(false)}>
      <Modal.Header>
        <h3 className="title">
          <span className="block text-center">Are you sure you want to delete list:</span>
          <i className="block text-center">{data.name}</i>
        </h3>
      </Modal.Header>
      <Modal.Footer>
        <div className="flex w-full gap-x-3 md:gap-x-4">
          <Button className="w-full" variant="outlined" color="primary" text="No" onClick={() => setModalOpen(false)} type="button" />
          <Button className="w-full" variant="contained" color="primary" text="Yes" type="submit" onClick={() => onClick()} />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteList;
