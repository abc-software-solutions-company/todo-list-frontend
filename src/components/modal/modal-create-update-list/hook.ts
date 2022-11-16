import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {Visibilities} from '@/utils/constant';
import iosAutoFocus from '@/utils/ios-autofocus';

import {IProps} from '.';

interface IFormInputs {
  name: string;
  visibility?: keyof typeof Visibilities;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});

export default function useModalCreateUpdateList({onClose, onSuccess, data}: IProps) {
  const {handleSubmit, formState, reset, setValue, getValues, setFocus, ...rest} = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  const {errors, isSubmitting} = formState;
  const toast = useToast();
  const router = useRouter();

  const submitHandler: SubmitHandler<IFormInputs> = async formData => {
    console.log('🚀 ~ file: hook.ts ~ line 35 ~ useModalCreateUpdateList ~ formData', formData);
    if (isSubmitting) return;
    const {name, visibility} = formData;
    let req;
    if (data?.id) {
      const {id} = data;
      req = api.todolist.update({id, name, visibility}).then(() => {
        toast.show({type: 'success', title: 'Update List', content: 'Successful!'});
      });
    } else
      req = api.todolist.create({name}).then(res => {
        toast.show({type: 'success', title: 'Create List', content: 'Successful!'});
        router.push(ROUTES.LIST + '/' + res.data.id);
      });
    req
      .then(onSuccess)
      .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}))
      .finally(() => {
        onClose();
        reset();
      });
  };

  useEffect(() => {
    setValue('name', data?.name || '');
    iosAutoFocus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {onSubmit: handleSubmit(submitHandler), errors, isSubmitting, ...rest};
}
