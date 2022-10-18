import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import api from '@/data/api';

import {IProps} from '.';

interface IFormInputs {
  name: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});

export default function useModalCreateUpdateList({open, onClose, onSuccess, data}: IProps) {
  const {handleSubmit, formState, reset, setFocus, ...rest} = useForm<IFormInputs>({resolver: yupResolver(Schema)});
  const {errors, isSubmitting} = formState;
  const toast = useToast();

  const submitHandler: SubmitHandler<IFormInputs> = async formData => {
    if (isSubmitting) return;
    const {name} = formData;
    let req;
    if (data?.id) {
      const {id} = data;
      req = api.list.update({id, name}).then(() => {
        toast.show({type: 'success', title: 'Update List', content: 'Successful!'});
        onSuccess?.();
      });
    } else req = api.list.create({name}).then(() => toast.show({type: 'success', title: 'Create List', content: 'Successful!'}));
    req
      .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}))
      .finally(() => {
        onClose();
        reset();
      });
  };
  useEffect(() => {
    setFocus('name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {onSubmit: handleSubmit(submitHandler), errors, isSubmitting, ...rest};
}
