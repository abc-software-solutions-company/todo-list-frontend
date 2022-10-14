import cls from 'classnames';
import Image from 'next/image';
import React from 'react';

import Button from '@/core-ui/button';

import {Modal} from '../../core-ui/modal';
import useLoginGoogle from '../../hooks/login/social-login/login-google';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ModalSocial: React.FC<IProps> = ({open, onClose}) => {
  const {openGooglePopUp} = useLoginGoogle();
  return (
    <Modal variant="center" className={cls(styles['com-modal-social'], 'max-w-[378px]')} open={open} onClose={onClose}>
      <Modal.Header />
      <Modal.Body className="container">
        <Button className=" bg-white text-black" onClick={() => openGooglePopUp()}>
          <Image src={'/google.png'} alt={'Login Google Logo'} />
          <span>Sign in with Google</span>
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSocial;
