/* eslint-disable react-hooks/exhaustive-deps */
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/user';
import useMediaQuery from '@/hooks/useMediaQuery';

import useLoginHandler from './login-handler';
import LogOutHandler from './logout-handler';

interface IFormInputs {
  userName: string;
}

const Schema = yup.object().shape({
  userName: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 32 letters').trim()
});

export default function useIndexHook() {
  const [socialOpen, setSocialOpen] = useState(false);
  const handleSocial = () => setSocialOpen(true);

  const {loginSuccess, loginFailed} = useLoginHandler();

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
          loginSuccess(res);
        }
      })
      .catch(() => loginFailed());
  };

  useEffect(() => {
    LogOutHandler();
  }, []);

  const {errors} = formState;

  return {onSubmit, matches, register, handleSubmit, formState, errors, handleSocial, socialOpen, setSocialOpen};
}
