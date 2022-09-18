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
import useLocalStorage from '@/utils/local-storage';

interface IFormInputs {
  userName: string;
}

const Schema = yup.object().shape({
  userName: yup.string().required('Please fill in your name.')
});

export default function useIndexHook() {
  const toast = useToast();
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();
  const {saveToken, saveUserProfile, removeUserProfile, removeToken, readPreviousLink} = useLocalStorage();

  const matches = useMediaQuery('(min-width:640px)');
  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.createUser(data)
      .then(res => {
        if (res.status === 201) {
          saveToken(res.data.accessToken);
          saveUserProfile(res.data.user);
          dispatchAuth(AuthActions.setUser(res.data.user));
          const previousPage = readPreviousLink();
          if (previousPage) {
            router.push(previousPage);
          } else {
            router.push(ROUTES.LOAD_CONTEXT_STATE);
          }
        }
      })
      .catch(() => {
        toast.show({type: 'danger', title: 'Error', content: 'Can&apos;t create user.'});
      });
  };

  useEffect(() => {
    removeToken();
    removeUserProfile();
  }, []);

  const {errors} = formState;

  return {onSubmit, matches, register, handleSubmit, formState, errors};
}
