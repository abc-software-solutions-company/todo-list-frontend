import cls from 'classnames';
import {FC} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import Modal from '@/core-ui/modal';
import {ITaskResponse} from '@/data/api/types/task.type';

import useModalShare from './hook';

export interface IProps {
  open: boolean;
  onClose: () => void;
  data: ITaskResponse;
}
const ModalShareTask: FC<IProps> = props => {
  const {id, link, copy} = useModalShare(props);
  const {open, onClose} = props;

  if (!open) return null;

  return (
    <Modal variant="center" className={cls('max-w-xl')} open={open} onClose={onClose}>
      <Modal.Header text={`Share this task to a teammate`} />
      <Modal.Body className="mb-6">
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
  );
};

export default ModalShareTask;
