import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {Visibilities} from '@/utils/constant';
import {ToastContents} from '@/utils/toast-content';
import { IProps } from './type-search';


interface IQuery {
  name: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.'),
  taskSymbol: yup.string().max(5, 'Maximum is 5')
});

export default function useModalSearch({open, onClose, onSuccess}: IProps) {
  const router = useRouter();
  const toast = useToast();

  const {formState, handleSubmit, reset, setValue, ...rest} = useForm<IQuery>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  useEffect(() => {
    reset();
  }, [open]);

  const {errors, isSubmitting} = formState;

  const submitHandler: SubmitHandler<IQuery> = ({ name }) => {
    if (isSubmitting) return;
    const req = api.task.search(name).then(res => {
      toast.show({type: 'success', title: 'Search', content: ToastContents.SUCCESS});
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

  return {errors, isSubmitting, onSubmit: handleSubmit(submitHandler), setValue, ...rest};
}
