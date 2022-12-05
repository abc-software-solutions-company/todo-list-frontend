import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import iosAutoFocus from '@/utils/ios-autofocus';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your To-Do name.')
});

interface IFormInputs {
  name: string;
}

export default function useModalCreateUpdateTask({onClose, onSuccess, todolistData, taskData}: IProps) {
  const toast = useToast();
  const {handleSubmit, formState, setValue, reset, setFocus, ...rest} = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  const {errors, isSubmitting} = formState;

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (isSubmitting) return;

    const {name} = formData;
    const req: Promise<any>[] = [];

    if (!taskData) {
      if (todolistData) {
        req.push(
          api.task.create({name, todolistId: todolistData.id}).then(() => {
            toast.show({type: 'success', title: 'Create To-Do', content: 'Successful!'});
          })
        );
      }
    } else {
      const {id} = taskData;
      req.push(
        api.task.update({id, name}).then(() => {
          toast.show({type: 'success', title: 'Update To-Do', content: 'Successful!'});
        })
      );
    }

    Promise.allSettled(req)
      .then(onSuccess)
      .catch(() => toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR}))
      .finally(() => reset());

    onClose();
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
