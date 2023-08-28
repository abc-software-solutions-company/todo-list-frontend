import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {useDocumentsStore} from '@/hooks/useDocuments';

import {IProps} from '../types-create';

interface IFormInputs {
  name: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your Document name.')
});

export default function useModalCreateDocument({open, onClose, docChild}: IProps) {
  const router = useRouter();
  const documentsState = useDocumentsStore();

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
    if (docChild) {
      const parentId = documentsState.currentDocument.id;
      documentsState.createDocument({todolistId, parentId, ...formData});
    } else documentsState.createDocument({todolistId, ...formData});
    reset();
    onClose();
  };

  return {errors, isSubmitting, onSubmit: handleSubmit(submitHandler), ...rest};
}
