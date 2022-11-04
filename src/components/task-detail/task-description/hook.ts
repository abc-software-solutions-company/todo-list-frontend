import {useState} from 'react';
import {useForm} from 'react-hook-form';

import useToast from '@/core-ui/toast';

interface IFormInputs {
  description: string;
}

export const useTaskDescription = () => {
  const {handleSubmit, formState, register} = useForm<IFormInputs>({mode: 'onChange'});
  const {isSubmitting} = formState;
  const [editDescription, setEditDescription] = useState(false);
  const toast = useToast();

  const onClick = () => setEditDescription(true);

  return {onClick, handleSubmit, register, isSubmitting, editDescription, toast, setEditDescription};
};
