/* eslint-disable react-hooks/exhaustive-deps */
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/data/api';
import useLoginHandler from '@/hooks/login/workflow/login-handler';
import useMediaQuery from '@/hooks/useMediaQuery';

interface IFormInputs {
  name: string;
}

// Schema validate form
const Schema = yup.object().shape({
  name: yup.string().required('Please fill in your name').max(32, 'Your name must not exceed 32 letters').trim()
});

export default function useGuestLoginHook() {
  // Handle Modal Login Social
  const [socialOpen, setSocialOpen] = useState(false);
  const handleSocial = () => setSocialOpen(true);
  // Handle After Login Success | After Login Failed
  const {loginSuccess, loginFailed} = useLoginHandler();
  // Media Query for Todo List Logo in HomePage (@TinTran)
  const matches = useMediaQuery('(min-width:640px)');
  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(Schema)
  });
  // Form Login Onsubmit handler
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.auth
      .login(data)
      .then(res => {
        loginSuccess(res.data);
      })
      .catch(() => loginFailed());
  };
  // Error State for prevent spam click in modal button
  const {errors} = formState;

  return {onSubmit, matches, register, handleSubmit, formState, errors, handleSocial, socialOpen, setSocialOpen};
}
