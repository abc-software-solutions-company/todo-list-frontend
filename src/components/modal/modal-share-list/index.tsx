import cls from 'classnames';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';

import styles from './style.module.scss';

interface IProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}
const ModalShareList: React.FC<IProps> = ({id, modalOpen, setModalOpen}) => {
  const toast = useToast();
  const [link, setLink] = useState<string>('');

  const copy = (text: string, title: string) => {
    toast.show({type: 'success', title: title, content: 'Successful!'});
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const location = window.location;
    setLink(location.origin + `/list/${id}`);
  }, [id]);

  return (
    <>
      {modalOpen && (
        <Modal variant="center" className={cls(styles['com-modal-share'], 'max-w-xl')} open={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header text="Share this list to a teammate" />
          <Modal.Body className="inputs">
            <div className="item">
              <Input
                label="Link:"
                groupEnd={
                  <Button className="btn-text" variant="contained" color="primary" onClick={() => copy(link, 'Link copy')}>
                    <Icon name="ico-copy" />
                  </Button>
                }
                value={link}
                readOnly
              />
            </div>
            <div className="item mt-3">
              <Input
                label="ID List:"
                groupEnd={
                  <Button className="btn-text" variant="contained" color="primary" onClick={() => copy(id, 'ID list copy')}>
                    <Icon name="ico-copy" />
                  </Button>
                }
                value={id.toUpperCase()}
                readOnly
              />
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ModalShareList;
