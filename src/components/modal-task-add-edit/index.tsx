import {yupResolver} from '@hookform/resolvers/yup';
import cls from 'classnames';
import {FC, useCallback, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';
import API from '@/data/api';
import {ITaskCreate, ITaskUpdate} from '@/data/api/types/task.type';

import styles from './style.module.scss';

interface IProps {
  data: ITaskCreate;
  open: boolean;
  todoListId?: string;
  onSave: () => void;
  onCancel?: () => void;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your To-Do name.')
});
const FORM_DEFAULT_VALUES = {
  name: ''
};

interface IFormInputs extends ITaskUpdate {
  todoListId?: string;
}

const ModalTaskAddEdit: FC<IProps> = ({data, open, todoListId, onSave, onCancel}) => {
  const inputRef = useCallback((node: HTMLInputElement) => {
    if (node) node.focus();
  }, []);
  const {handleSubmit, reset, control, formState, setValue} = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });
  if (data?.todoListId) setValue('name', data?.name);
  const toast = useToast();
  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormInputs> = formData => {
    console.log(typeof formData);
    if (formState.isSubmitting) return;
    formData.todoListId = todoListId!;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {name} = formData;
    console.log(formData);
    // if (todoListId && name) {
    //   API.task.create({name, todoListId}).then(() => {
    //     toast.show({type: 'success', title: 'Create To-Do', content: 'Successful!'});
    //     onSave?.();
    //   });
    // }
  };

  useEffect(() => {
    reset(FORM_DEFAULT_VALUES);
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
          <h3 className="title">{data?.todoListId ? 'Update To-Do' : 'Add New To-Do'}</h3>
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
              text={data?.todoListId ? 'Save' : 'Create'}
              type="submit"
              loading={formState.isSubmitting}
              disabled={formState.isSubmitting}
            />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalTaskAddEdit;
