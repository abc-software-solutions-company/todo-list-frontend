import React from 'react';

import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';
import API from '@/api/network/todo-list';
import styles from './style.module.scss';
import {useRouter} from 'next/router';
import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';

interface IProps {
  open: boolean;
  onClose?: () => void;
  listID?: string;
  listName?: string;
}

const ModalDeleteList: React.FC<IProps> = ({listID, listName, open, onClose}) => {
  const router = useRouter();
  const toast = useToast();

  const handleDeleteList = () => {
    API.deleteTodoList(Number(listID)).then(res => {
      if (res.status == 200) {
        toast.show({type: 'danger', title: '', content: `You have deleted list: ${listName}!`, lifeTime: 5000});
        localStorage.setItem('modalCreateList', 'open');
        router.push(ROUTES.LIST);
      }
    });
  };

  return (
    <div className={styles['com-modal-delete-list']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Are you sure you want to delete list {listName}</h3>
        </Modal.Header>
        <Modal.Footer>
          <Button className="btn" text="No" onClick={onClose} theme="white" />
          <Button className="btn" text="Yes" onClick={() => handleDeleteList()} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDeleteList;
