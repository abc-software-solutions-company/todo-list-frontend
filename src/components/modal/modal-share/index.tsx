import cls from 'classnames';
import {FC} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';

import useModalShare from './hook';
import styles from './style.module.scss';

export interface IProps {
  open: boolean;
  onClose: () => void;
  data: ITodolistResponse | ITaskResponse;
}
const ModalShare: FC<IProps> = props => {
  const {id, link, copy, role} = useModalShare(props);
  const {open, onClose} = props;

  return (
    <>
      {open && (
        <Modal variant="center" className={cls(styles['com-modal-share'], 'max-w-xl')} open={open} onClose={onClose}>
          <Modal.Header text={`Share this ${role} to a teammate`} />
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
                label="Id:"
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

export default ModalShare;
