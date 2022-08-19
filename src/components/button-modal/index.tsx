import React, {useContext} from 'react';

import ModalCtx from '@/contexts/modal.context';

import styles from './style.module.scss';

const ButtonModal: React.FC = () => {
  const modalContext = useContext(ModalCtx);
  return (
    <>
      <div className={styles['btn-wraper']}>
        <button type="button" onClick={modalContext?.show} className="btn">
          Open dialog
        </button>
      </div>
    </>
  );
};

export default ButtonModal;
