import cls from 'classnames';
import React, {useEffect, useState} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';

import {Modal} from '../../core-ui/modal';
import styles from './style.module.scss';

interface IProps {
  id: string;
  open: boolean;
  onClose: () => void;
}
const ModalShare: React.FC<IProps> = ({id, open, onClose}) => {
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
    <Modal variant="center" className={cls(styles['com-modal-share'], 'max-w-xl')} open={open} onClose={onClose}>
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
  );
};

export default ModalShare;
