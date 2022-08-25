import {FormGroup} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

import IconClose from '@/assets/images/icon-close.svg';

import Modal from '../../core-ui/modal';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose?: () => void;
}
const ModalShare: React.FC<IProps> = ({open, onClose}) => {
  console.log(open);

  return (
    <div className={cn(styles['com-modal-share'])}>
      <Modal open={open} onClose={onClose}>
        <div className="icon-close" onClick={onClose}>
          <Image src={IconClose} alt="Close" width={21} />
        </div>
        <div className="modal-share">
          <div className="content-modal">
            <h3 className="title-modal">Share this list to a teammate</h3>

            <div className="input-group-link">
              <label className="title-label" htmlFor="">
                Link:
              </label>
            </div>
            <div className="input-group-modal ">
              <FormGroup row>
                <TextField placeholder="https://to-do-list/board/#8f677ssf" className="input-control" />
                <Button variant="contained" className="text-copy">
                  Copy
                </Button>
              </FormGroup>
            </div>
            <div className="input-group-ID">
              <label className="title-label" htmlFor="">
                ID List:
              </label>
            </div>
            <div className="input-group-modal ">
              <FormGroup row>
                <TextField placeholder="A0001" className="input-control" />
                <Button className="text-copy" variant="contained">
                  Copy
                </Button>
              </FormGroup>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalShare;
