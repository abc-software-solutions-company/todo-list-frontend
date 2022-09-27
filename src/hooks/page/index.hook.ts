/* eslint-disable react-hooks/exhaustive-deps */
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/user';
import {ROUTES} from '@/configs/routes.config';
import {AuthActions} from '@/contexts/auth';
import {useDispatchAuth} from '@/contexts/auth/context';
import useToast from '@/core-ui/toast';
import useMediaQuery from '@/hooks/useMediaQuery';
import LocalStorage from '@/utils/local-storage';

interface IFormInputs {
  userName: string;
}

const Schema = yup.object().shape({
  userName: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 32 letters').trim()
});

export default function useIndexHook() {
  const toast = useToast();
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();

  const matches = useMediaQuery('(min-width:640px)');
  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(Schema)
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.createUser(data)
      .then(res => {
        if (res.status === 201) {
          LocalStorage.accessToken.set(res.data.accessToken);
          dispatchAuth(AuthActions.login(res.data.user));
          const previousPage = LocalStorage.previousPage.get();
          if (previousPage) {
            router.push(previousPage);
          } else {
            router.push(ROUTES.HOME);
          }
        }
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error', content: 'Can&apos;t create user.'});
      });
  };

  useEffect(() => {
    LocalStorage.accessToken.remove();
    LocalStorage.firebaseAuthData.remove();
  }, []);

  const {errors} = formState;

  return {onSubmit, matches, register, handleSubmit, formState, errors};
}
