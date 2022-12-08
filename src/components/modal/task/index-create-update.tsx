import {yupResolver} from '@hookform/resolvers/yup';
import cls from 'classnames';
import {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import {ITaskResponse} from '@/data/api/types/task.type';
import iosAutoFocus from '@/utils/ios-autofocus';

import styles from './style-create-update.module.scss';

export interface IProps {
  open: boolean;
  saveText: string;
  taskData?: ITaskResponse;
  title: string;
  handleSave: (param: IFormInputs) => void;
  onClose: () => void;
  onSuccess?: () => void;
}

interface IFormInputs {
  name: string;
}
const Schema = yup.object().shape({
  name: yup.string().required('Please enter your To-Do name.')
});

const ModalCreateUpdateTask: FC<IProps> = props => {
  const {open, saveText, taskData, title, handleSave, onClose} = props;
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    setFocus,
    formState: {errors, isSubmitSuccessful, isSubmitting}
  } = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  const onSubmit = handleSubmit(handleSave);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setFocus('name');
    iosAutoFocus();
  }, [setFocus]);

  useEffect(() => {
    reset();
    setValue('name', taskData?.name || '');
  }, [open, taskData, setValue]);

  return (
    <>
      {open && (
        <Modal
          className={cls(styles['com-modal-task-add-edit'], 'max-w-xl')}
          variant="center"
          open={open}
          onClose={onClose}
        >
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">{title}</h3>
            </Modal.Header>
            <Modal.Body>
              <Input
                error={errors.name?.message}
                autoFocus={true}
                placeholder={'Enter your list name'}
                {...register('name', {value: taskData?.name})}
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
                  text={saveText}
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

export default ModalCreateUpdateTask;
