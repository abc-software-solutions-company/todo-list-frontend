import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import api from '@/data/api';

import {IProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your To-Do name.')
});

interface IFormInput {
  name: string;
}

export default function useModalCreateUpdateTask({modalOpen, setModalOpen, listData, taskData}: IProps) {
  const toast = useToast();
  const {handleSubmit, setFocus, ...rest} = useForm<IFormInput>({resolver: yupResolver(Schema)});

  const onClose = () => setModalOpen(false);

  const submitHandler: SubmitHandler<IFormInput> = formData => {
    const {name} = formData;
    let req: Promise<any>;
    if (!taskData) {
      req = api.task.create({name, todoListId: listData.id}).then(() => toast.show({type: 'success', title: 'Create To-Do', content: 'Successful!'}));
    } else {
      req = api.task.update({name, id: taskData.id}).then(() => toast.show({type: 'success', title: 'Update To-Do', content: 'Successful!'}));
    }
    req.catch(() => toast.show({type: 'danger', title: 'Err', content: 'Err!'})).finally(onClose);
  };

  useEffect(() => {
    setFocus('name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  return {onClose, onSubmit: handleSubmit(submitHandler), ...rest};
}
