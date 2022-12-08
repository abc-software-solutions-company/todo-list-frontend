import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useTodolist from '@/states/todolist/use-todolist';
import {Visibilities} from '@/utils/constant';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '../types-create-update';

interface IFormInputs {
  name: string;
  visibility?: keyof typeof Visibilities;
  member: {ids: string[]};
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});

export default function useModalUpdateList({data, open, onClose, onSuccess}: IProps) {
  const router = useRouter();
  const toast = useToast();
  const {setTodolist} = useTodolist();

  const {formState, handleSubmit, reset, setValue, ...rest} = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  const {errors, isSubmitting} = formState;

  useEffect(() => {
    reset();
    setValue('name', data?.name || '');
  }, [data, open, setValue]);

  const submitHandler: SubmitHandler<IFormInputs> = async formData => {
    if (isSubmitting) return;
    const {name, visibility, member} = formData;

    if (data) {
      const {id} = data;
      const req = api.todolist.update({id, name, visibility, member}).then(res => {
        if (router.asPath.includes(ROUTES.LIST)) {
          const newTodolist: ITodolistResponse = res.data;
          newTodolist.name = name;
          setTodolist(newTodolist);
        }
        toast.show({type: 'success', title: 'Update List', content: ToastContents.SUCCESS});
      });

      req
        .then(onSuccess)
        .catch(e => {
          console.log(e);
          toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR});
        })
        .finally(() => reset());
    }

    onClose();
  };

  useEffect(() => {
    setValue('name', data?.name || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {errors, isSubmitting, setValue, onSubmit: handleSubmit(submitHandler), ...rest};
}
