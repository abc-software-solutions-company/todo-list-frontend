import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import detectIdOrLink from '@/utils/detect-id-or-link';

interface IFormInputs {
  idOrLink: string;
}

const Schema = yup.object().shape({
  idOrLink: yup.string().required('Please enter Link or ID')
});

export default function useLobbyHook() {
  const router = useRouter();
  const toast = useToast();

  const {handleSubmit, ...rest} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });

  const submitHandler: SubmitHandler<IFormInputs> = data => {
    const id = detectIdOrLink(data.idOrLink).trim();
    api.todolist
      .getOne({id})
      .then(res => {
        toast.show({type: 'success', title: 'Success', content: 'Join List Successfull'});
        router.push(`${ROUTES.LIST}/${res.data.id}`);
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error!', content: 'List not found'});
      });
  };

  return {onSubmit: handleSubmit(submitHandler), ...rest};
}
