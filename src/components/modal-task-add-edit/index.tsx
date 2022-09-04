import {yupResolver} from '@hookform/resolvers/yup';
import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API, {ITask} from '@/api/network/task';
import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';

import styles from './style.module.scss';
import Input from '@/core-ui/input';

interface IProps {
  data: ITask;
  open: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

interface IFormInputs {
  name: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your task name.')
});

const ModalTaskAddEdit: FC<IProps> = ({data, open, onSave, onCancel}) => {
  const {register, handleSubmit, setValue, formState} = useForm<IFormInputs>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  const getTask = (id: string) => {
    API.getTask(id).then(res => {
      const resp = res.data as ITask;
      setValue('name', resp.name);
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    if (data?.id) {
      API.updateTask(data.id, formData).then(() => onSave?.());
    } else {
      API.createTask(formData).then(() => onSave?.());
    }
  };

  useEffect(() => {
    if (data?.id) getTask(data.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal className={styles['com-modal-task-add-edit']} variant="center" open={open} onClose={() => onCancel?.()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <h3 className="title">{data?.id ? 'Update list' : 'Create New Task'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Input error={errors.name?.message} {...register('name')} placeholder="Enter your task" />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full gap-x-3 md:gap-x-5">
            <Button
              className="btn btn-cancel"
              // variant="outlined"
              // color="secondary"
              text="Cancel"
              onClick={() => onCancel?.()}
              type="button"
            />
            <Button
              className="btn btn-create"
              variant="contained"
              // color="primary"
              text="Create"
              type="submit"
            />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalTaskAddEdit;
