import cn from 'classnames';
import React from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';

import {Modal} from '../../core-ui/modal';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose: () => void;
  id?: string;
}
const ModalShare: React.FC<IProps> = ({open, onClose, id}) => {
  const href = window.location.href.split('/');
  // const linkToDoList = href[0] + href[1] + href[2] + href[3];
  const linkToDoList = [href[0], href[1], href[2], 'list', id].join('/');

  return (
    <Modal className={cn(styles['com-modal-share'])} open={open} onClose={onClose}>
      <Modal.Header>
        <h3 className="title">Share this list to a teammate</h3>
      </Modal.Header>

      <div className="modal-share">
        <div className="content-modal">
          <div className="input-group-link">
            <label className="title-label" htmlFor="">
              Link:
            </label>
          </div>
          <div className="input-group-modal ">
            <Input value={linkToDoList} className="input-control" />
            <Button
              variant="contained"
              color="primary"
              className="text-copy"
              onClick={() => navigator.clipboard.writeText(linkToDoList)}
            >
              Copy
            </Button>
          </div>
          <div className="input-group-ID">
            <label className="title-label" htmlFor="">
              ID List:
            </label>
          </div>
          <div className="input-group-modal ">
            <Input value={id} className="input-control" />
            <Button
              className="text-copy"
              variant="contained"
              color="primary"
              onClick={() => navigator.clipboard.writeText(id)}
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShare;
