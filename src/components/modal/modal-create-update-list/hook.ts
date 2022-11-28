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

import {IProps} from '.';

interface IFormInputs {
  name: string;
  visibility?: keyof typeof Visibilities;
  member: {ids: string[]};
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});

export default function useModalCreateUpdateList({onClose, onSuccess, data}: IProps) {
  const router = useRouter();
  const {todolist, setTodolist} = useTodolist();
  const {handleSubmit, formState, reset, setValue, getValues, setFocus, ...rest} = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  const {errors, isSubmitting} = formState;
  const toast = useToast();

  const submitHandler: SubmitHandler<IFormInputs> = async formData => {
    console.log('🚀 ~ file: hook.ts ~ line 37 ~ useModalCreateUpdateList ~ formData', formData);
    if (isSubmitting) return;
    const {name, visibility, member} = formData;
    let req;
    if (!data) {
      req = api.todolist.create({name}).then(res => {
        toast.show({type: 'success', title: 'Create List', content: 'Successful!'});
        router.push(ROUTES.LIST + '/' + res.data.id);
      });
    } else {
      const {id} = data;
      req = api.todolist.update({id, name, visibility, member}).then(() => {
        if (router.asPath.includes(ROUTES.LIST)) {
          const newTodolist: ITodolistResponse = JSON.parse(JSON.stringify(todolist));
          newTodolist.name = name;
          setTodolist(newTodolist);
        }
        toast.show({type: 'success', title: 'Update List', content: 'Successful!'});
      });
    }

    req
      .then(onSuccess)
      .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}))
      .finally(() => reset());
    onClose();
  };

  useEffect(() => {
    setValue('name', data?.name || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {onSubmit: handleSubmit(submitHandler), errors, isSubmitting, setValue, ...rest};
}
