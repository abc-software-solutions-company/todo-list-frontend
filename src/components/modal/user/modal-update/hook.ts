import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {AuthActions} from '@/states/auth';
import {useDispatchAuth} from '@/states/auth/context';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

interface IFormInputs {
  name: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your name.')
});

export default function useModalUpdateUser({data, open, onClose}: IProps) {
  const toast = useToast();
  const authDispatch = useDispatchAuth();

  const {
    formState: {errors, isSubmitting},
    handleSubmit,
    reset,
    setValue,
    ...rest
  } = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  useEffect(() => {
    reset();
  }, [open]);

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    const req: Promise<any>[] = [];
    if (data) {
      const {name} = formData;
      const {id, email} = data;

      req.push(
        api.user
          .update({id, name})
          .then(() => {
            toast.show({type: 'success', title: "Update user's name", content: 'Successful!'});
          })
          .then(() => {
            authDispatch(AuthActions.login({id, name, email}));
          })
      );
    }
    Promise.allSettled(req).catch(() => toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR}));
    onClose();
  };

  return {errors, isSubmitting, setValue, onSubmit: handleSubmit(submitHandler), ...rest};
}
