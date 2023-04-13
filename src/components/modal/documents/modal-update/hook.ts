import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import {useDocumentsStore} from '@/hooks/useDocuments';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '../types-create';

interface IFormInputs {
  name: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your Document name.')
});

export default function useModalUpdateDocument({open, onClose}: IProps) {
  const toast = useToast();
  const {error, document, updateDocument} = useDocumentsStore();

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
    const id = document.id;
    const content = String(document.content);
    const favorite = document.favorite;
    updateDocument({id, content, favorite, ...formData});
    if (error) {
      toast.show({type: 'danger', title: 'Rename Error', content: ToastContents.ERROR});
    } else {
      toast.show({type: 'success', title: 'Rename Success', content: ToastContents.SUCCESS});
    }
    reset();
    onClose();
  };

  return {errors, isSubmitting, onSubmit: handleSubmit(submitHandler), ...rest};
}
