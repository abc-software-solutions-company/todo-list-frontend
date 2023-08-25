import cls from 'classnames';
import Image from 'next/image';
import React from 'react';

import useLoginGoogle from '@/components/login/hooks/login-google';
import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';

import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ModalThirdPartyLogin: React.FC<IProps> = ({open, onClose}) => {
  const {openGooglePopUp} = useLoginGoogle();

  return (
    <Modal variant="center" className={cls(styles['com-modal-social'], 'max-w-[378px]')} open={open} onClose={onClose}>
      <Modal.Header />
      <Modal.Body className="container">
        <Button
          className=" bg-white text-black"
          onClick={() => {
            openGooglePopUp();
            onClose();
          }}
        >
          <Image src={'/icons/google.png'} alt={'Login Google Logo'} width={24} height={24} />
          <span>Sign in with Google</span>
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalThirdPartyLogin;
