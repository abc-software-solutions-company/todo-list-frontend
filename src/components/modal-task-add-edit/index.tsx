import {yupResolver} from '@hookform/resolvers/yup';
import cls from 'classnames';
import {FC, useCallback, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/task';
import {ITask} from '@/api/types/task.type';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';

import styles from './style.module.scss';

interface IProps {
  data: ITask;
  open: boolean;
  todoListId?: string;
  onSave: () => void;
  onCancel?: () => void;
}

interface IFormInputs {
  name: string;
  todoListId?: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your To-Do name.')
});
const FORM_DEFAULT_VALUES = {
  name: ''
};

const ModalTaskAddEdit: FC<IProps> = ({data, open, todoListId, onSave, onCancel}) => {
  const inputRef = useCallback((node: HTMLInputElement) => {
    if (node) node.focus();
  }, []);
  const {handleSubmit, reset, setValue, control, formState} = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });
  const toast = useToast();
  const {errors} = formState;

  const getTask = (id: string) => {
    API.getTask(id).then(res => {
      const resp = res.data as ITask;
      setValue('name', resp.name);
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    formData.todoListId = todoListId;

    if (data?.id) {
      API.updateTask(data.id, formData)
        .then(() => {
          toast.show({type: 'success', title: 'Update To-Do', content: 'Successful!'});
          onSave?.();
        })
        .catch(() => {
          toast.show({
            type: 'danger',
            title: 'Update To-Do',
            content: 'Error, Cannot update todo'
          });
        });
    } else {
      API.createTask(formData)
        .then(() => {
          toast.show({type: 'success', title: 'Create To-Do', content: 'Successful!'});
          onSave();
        })
        .catch(() => {
          toast.show({
            type: 'danger',
            title: 'Create To-Do',
            content: 'Error, Cannot create Todo'
          });
        });
    }
  };

  useEffect(() => {
    if (data?.id) getTask(data.id);
    else {
      reset(FORM_DEFAULT_VALUES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal
      className={cls(styles['com-modal-task-add-edit'], 'max-w-xl')}
      variant="center"
      open={open}
      onClose={() => onCancel?.()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <h3 className="title">{data?.id ? 'Update To-Do' : 'Add New To-Do'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Controller
            name="name"
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <Input
                {...field}
                error={errors.name?.message}
                placeholder="Enter your to-do"
                ref={inputRef}
                onKeyPress={e => {
                  if (e.key === 'Enter') handleSubmit(onSubmit);
                }}
              />
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full gap-x-3 md:gap-x-4">
            <Button
              className="w-full"
              variant="outlined"
              color="primary"
              text="Cancel"
              onClick={() => onCancel?.()}
              type="button"
            />
            <Button
              className="w-full"
              variant="contained"
              color="primary"
              text={data?.id ? 'Save' : 'Create'}
              type="submit"
            />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalTaskAddEdit;
