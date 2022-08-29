import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo-list';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import Modal from '@/core-ui/modal';

import styles from './style.module.scss';
import useToast from '@/core-ui/toast';

const Schema = yup.object().shape({
  listName: yup.string().required('Please enter your list name.')
});

interface IFormInputs {
  listName: string;
}

const FORM_DEFAULT_VALUES: IFormInputs = {
  listName: ''
};

interface IProps {
  open: boolean;
  onClose?: () => void;
}

const ModalCreateList: React.FC<IProps> = ({open, onClose}) => {
  const toast = useToast();
  // Use React Hook Form.
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitSuccessful, isValid}
  } = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.createTodoList(data)
      .then(res => {
        if (res.status === 201) {
          toast.show({type: 'info', title: '', content: `You have add list: ${data.listName}!`, lifeTime: 5000});
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <div className={styles['com-modal-create-list']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Create New list</h3>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Input
              className={errors.listName && 'error'}
              placeholder="Enter your list"
              {...register('listName', {required: true})}
            />
            {errors.listName && <p className="invalid">{errors.listName.message}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn" text="Cancel" onClick={onClose} />
            <Button className="btn" text="Create" type="submit" onClick={isValid ? onClose : () => {}} />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalCreateList;
