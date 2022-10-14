import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import API from '@/data/api';
import {IAction} from '@/types';
import detectIdOrLink from '@/utils/detect-id-or-link';

interface IFormInputs {
  listId: string;
}

const Schema = yup.object().shape({
  listId: yup.string().required('Please enter Link or ID')
});

export default function useLobbyHook() {
  const router = useRouter();
  const toast = useToast();
  const [action, setAction] = useState<IAction>({type: '', payload: null});

  const resetAction = () => setAction({type: '', payload: null});
  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });
  const {errors} = formState;

  const reset = () => resetAction();

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const id = detectIdOrLink(data.listId).trim();
    API.list
      .getOne({id})
      .then(res => {
        toast.show({type: 'success', title: 'Success', content: 'Join List Successfull', lifeTime: 3000});
        console.log(res.data);
        router.push(`${ROUTES.LIST}/${id}`);
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error!', content: 'List not found', lifeTime: 3000});
      });
  };

  return {action, setAction, errors, onSubmit, register, handleSubmit, reset, formState, resetAction};
}
