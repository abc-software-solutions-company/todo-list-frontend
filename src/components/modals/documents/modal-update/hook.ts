import {yupResolver} from '@hookform/resolvers/yup';
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

export default function useModalUpdateDocument({onClose}: IProps) {
  const documentsState = useDocumentsStore();

  const {formState, handleSubmit, ...rest} = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  const {errors, isSubmitting} = formState;
  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (isSubmitting) return;
    documentsState.updateDocument({...documentsState.currentDocument, ...formData});
    onClose();
  };

  return {errors, isSubmitting, onSubmit: handleSubmit(submitHandler), ...rest};
}
