import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import useToast from '@/core-ui/toast';
import api from '@/data/api';

import {IProps} from '.';

interface IFormInputs {
  name: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});

export default function useModalCreateUpdateList({setModalOpen, data}: IProps) {
  const {handleSubmit, setValue, reset, control, formState} = useForm<IFormInputs>({
    defaultValues: {name: ''},
    resolver: yupResolver(Schema)
  });
  const toast = useToast();

  const submitHandler: SubmitHandler<IFormInputs> = async formData => {
    console.log(formData);
    const {name} = formData;
    if (formState.isSubmitting) return;

    if (data?.id) {
      const {id} = data;
      api.list
        .update({id, name})
        .then(() => {
          toast.show({type: 'success', title: 'Update List', content: 'Successful!'});
        })
        .catch(() => {
          toast.show({type: 'danger', title: 'Update List', content: 'Error, Cannot update List'});
        })
        .finally(() => {
          setModalOpen(false);
        });
    } else {
      api.list
        .create({name})
        .then(() => {
          toast.show({type: 'success', title: 'Create List', content: 'Successful!'});
          reset();
        })
        .catch(() => {
          toast.show({type: 'danger', title: 'Create List', content: 'Error, Cannot create List'});
        })
        .finally(() => {
          setModalOpen(false);
        });
    }
  };

  return {onSubmit: handleSubmit(submitHandler), setValue, control, formState};
}
