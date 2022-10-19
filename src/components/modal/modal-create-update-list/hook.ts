import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

import {IProps} from '.';

interface IFormInputs {
  name: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});

export default function useModalCreateUpdateList({onClose, onSuccess, data}: IProps) {
  const {handleSubmit, formState, setValue, ...rest} = useForm<IFormInputs>({resolver: yupResolver(Schema)});
  const {errors, isSubmitting} = formState;
  const toast = useToast();
  const router = useRouter();

  const submitHandler: SubmitHandler<IFormInputs> = async formData => {
    if (isSubmitting) return;
    const {name} = formData;
    let req;
    if (data?.id) {
      const {id} = data;
      req = api.list.update({id, name}).then(() => {
        toast.show({type: 'success', title: 'Update List', content: 'Successful!'});
      });
    } else
      req = api.list.create({name}).then(res => {
        toast.show({type: 'success', title: 'Create List', content: 'Successful!'});
        router.push(ROUTES.LIST + '/' + res.data.id);
      });
    req
      .then(onSuccess)
      .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}))
      .finally(() => {
        onClose();
      });
  };

  useEffect(() => {
    setValue('name', data?.name || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {onSubmit: handleSubmit(submitHandler), errors, isSubmitting, ...rest};
}
