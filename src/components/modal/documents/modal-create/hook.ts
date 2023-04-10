import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {useDocumentsStore} from '@/hooks/useDocuments';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '../types-create';

interface IFormInputs {
  name: string;
  content?: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your Document name.'),
  content: yup.string()
});

export default function useModalCreateDocument({open, onClose}: IProps) {
  const router = useRouter();
  const toast = useToast();
  const {getAllDocument} = useDocumentsStore();

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
    const req = api.documents.create({name, todolistId, content}).then(() => {
      toast.show({type: 'success', title: 'Create Document', content: ToastContents.SUCCESS});
    });

    req
      .then(() => {
        getAllDocument(todolistId);
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR});
      })
      .finally(() => reset());

    onClose();
  };

  return {errors, isSubmitting, onSubmit: handleSubmit(submitHandler), ...rest};
}
