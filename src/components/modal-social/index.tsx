import cls from 'classnames';
import React from 'react';

import Button from '@/core-ui/button';

import {Modal} from '../../core-ui/modal';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose: () => void;
}
const ModalSocial: React.FC<IProps> = ({open, onClose}) => {
  return (
    <Modal variant="center" className={cls(styles['com-modal-social'], 'max-w-[378px]')} open={open} onClose={onClose}>
      <Modal.Header />
      <Modal.Body className="container">
        <Button className=" bg-white text-black">
          <img src="/google.png" />
          <span>Sign in with Google</span>
        </Button>
        <Button className="mt-5 bg-blue-600  text-white">
          <img src="/facebook.png" />
          <span>Sign in with Facebook</span>
        </Button>
        <Button className="mt-5 bg-sky-400  text-white">
          <img src="/twitter.png" />
          <span>Sign in with Twitter</span>
        </Button>
        <Button className="mt-5 bg-slate-800  text-white">
          <img src="/github.png" />
          <span>Sign in with Github</span>
        </Button>
        <Button className="mt-5 bg-red-600  text-white">
          <img src="/email-filled.png" />
          <span>Sign in with Email</span>
        </Button>
        <Button className="mt-5 bg-green-500  text-white">
          <img src="/phone-filled.png" />
          <span>Sign in with Phone</span>
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSocial;
