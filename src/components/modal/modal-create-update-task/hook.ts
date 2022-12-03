import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useTodolist from '@/states/todolist/use-todolist';
import iosAutoFocus from '@/utils/ios-autofocus';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your To-Do name.')
});

interface IFormInputs {
  name: string;
}

export default function useModalCreateUpdateTask({onClose, onSuccess, todolistData, taskData}: IProps) {
  const {todolist, setTodolist} = useTodolist();
  const router = useRouter();
  const toast = useToast();
  const {handleSubmit, formState, setValue, reset, setFocus, ...rest} = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });

  const {errors, isSubmitting} = formState;

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (isSubmitting) return;

    const {name} = formData;
    let req: Promise<any>;
    const newTodolist: ITodolistResponse = JSON.parse(JSON.stringify(todolist));

    if (!taskData) {
      req = api.task.create({name, todolistId: todolistData.id}).then(res => {
        newTodolist.tasks.push({...res.data, assignees: []} as ITaskResponse);
        toast.show({type: 'success', title: 'Create To-Do', content: ToastContents.SUCCESS});
      });
    } else {
      const {id} = taskData;
      req = api.task.update({id, name}).then(() => {
        if (router.asPath.includes(ROUTES.LIST) && todolist) {
          newTodolist.tasks.filter(e => e.id === id)[0].name = name;
        }
        toast.show({type: 'success', title: 'Update To-Do', content: ToastContents.SUCCESS});
      });
    }
    req
      .then(() => setTodolist(newTodolist))
      .then(onSuccess)
      .catch(() => toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR}))
      .finally(() => reset());

    onClose();
  };

  useEffect(() => {
    setFocus('name');
    iosAutoFocus();
  }, [setFocus]);

  return {
    onSubmit: handleSubmit(submitHandler),
    errors,
    setValue,
    isSubmitting,
    ...rest
  };
}
