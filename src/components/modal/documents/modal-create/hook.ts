import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '../types-create-update';

interface IFormInputs {
  name: string;
  content?: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your Document name.'),
  content: yup.string()
});

export default function useModalCreateDocument({open, onClose, onSuccess}: IProps) {
  const router = useRouter();
  const toast = useToast();

  const {formState, handleSubmit, reset, setValue, ...rest} = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  useEffect(() => {
    reset();
  }, [open]);

  const {errors, isSubmitting} = formState;

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (isSubmitting) return;
    const {name, content} = formData;
    const todolistId = String(router.query.id);
    const req = api.document.create({name, todolistId, content}).then(res => {
      toast.show({type: 'success', title: 'Create Document', content: ToastContents.SUCCESS});
      window.location.reload();
    });

    req
      .then(onSuccess)
      .catch(e => {
        console.log(e);
        toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR});
      })
      .finally(() => reset());

    onClose();
  };

  return {errors, isSubmitting, onSubmit: handleSubmit(submitHandler), ...rest};
}
