import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
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

export default function useModalCreateDocument({open, onClose, docChild}: IProps) {
  const router = useRouter();
  const toast = useToast();
  const {error, document, createDocument} = useDocumentsStore();

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
    const todolistId = String(router.query.id);
    const parentId = document.id;
    if (docChild) {
      createDocument({todolistId, parentId, ...formData});
    } else createDocument({todolistId, ...formData});
    if (error) {
      toast.show({type: 'danger', title: 'Create Document Error', content: ToastContents.ERROR});
    } else {
      toast.show({type: 'success', title: 'Create Document Error', content: ToastContents.SUCCESS});
    }
    reset();
    onClose();
  };

  return {errors, isSubmitting, onSubmit: handleSubmit(submitHandler), ...rest};
}
