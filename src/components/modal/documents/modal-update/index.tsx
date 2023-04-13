import cls from 'classnames';
import {FC, useEffect} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {useDocumentsStore} from '@/hooks/useDocuments';
import iosAutoFocus from '@/utils/ios-autofocus';

import useModalUpdateDocument from '../../documents/modal-update/hook';
import styles from '../style-create-upate.module.scss';
import {IProps} from '../types-create';

const ModalUpdateDocument: FC<IProps> = props => {
  const {open, onClose} = props;
  const {isSubmitting, errors, onSubmit, register, setFocus} = useModalUpdateDocument(props);
  const {document} = useDocumentsStore();
  useEffect(() => {
    setFocus('name');
    iosAutoFocus();
  }, [setFocus]);

  return (
    <>
      {open && (
        <Modal
          className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')}
          variant="center"
          open={open}
          onClose={onClose}
        >
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">Rename Document</h3>
            </Modal.Header>
            <Modal.Body>
              <Input
                autoFocus={true}
                error={errors.name?.message}
                placeholder={document.name}
                value={document.name}
                {...register('name')}
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="content">
                <Button
                  className="w-full"
                  variant="outlined"
                  color="primary"
                  text="Cancel"
                  onClick={onClose}
                  type="button"
                />
                <Button
                  className="w-full"
                  variant="contained"
                  color="primary"
                  text="Rename"
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ModalUpdateDocument;
