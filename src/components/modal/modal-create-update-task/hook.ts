import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import iosAutoFocus from '@/utils/ios-autofocus';

import {IProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your To-Do name.')
});

interface IFormInputs {
  name: string;
}

export default function useModalCreateUpdateTask({onClose, onSuccess, listData, taskData}: IProps) {
  const toast = useToast();
  const {handleSubmit, formState, setValue, reset, setFocus, ...rest} = useForm<IFormInputs>({resolver: yupResolver(Schema), mode: 'onChange'});

  const {errors, isSubmitting} = formState;

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (isSubmitting) return;

    const {name} = formData;
    let req: Promise<any>;

    if (!taskData) {
      req = api.task.create({name, todolistId: listData.id}).then(() => {
        toast.show({type: 'success', title: 'Create To-Do', content: 'Successful!'});
      });
    } else req = api.task.update({name, id: taskData.id}).then(() => toast.show({type: 'success', title: 'Update To-Do', content: 'Successful!'}));

    req
      .then(onSuccess)
      .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}))
      .finally(() => {
        onClose();
        reset();
      });
  };

  useEffect(() => {
    setFocus('name');
    iosAutoFocus();
  }, [setFocus]);

  return {
    onSubmit: handleSubmit(submitHandler),
    errors,
    setValue,
    isSubmitting,
    ...rest
  };
}
