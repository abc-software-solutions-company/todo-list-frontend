import {yupResolver} from '@hookform/resolvers/yup';
import cls from 'classnames';
import React, {FC, useCallback, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';
import API from '@/data/api/index';
import {IList} from '@/data/api/types/list.type';

// import useToast from '@/core-ui/toast';
import styles from './style.module.scss';

interface IProps {
  data: IList;
  open: boolean;
  onCancel?: () => void;
  onSave?: () => void;
}

interface IFormInputs {
  name: string;
  userId?: string;
}

const Schema = yup.object().shape({
  name: yup.string().required('Please enter your list name.')
});
const FORM_DEFAULT_VALUES = {
  name: ''
};

const ModalTodoAddEdit: FC<IProps> = ({data, open, onCancel, onSave}) => {
  const inputRef = useCallback((node: HTMLInputElement) => {
    if (node) node.focus();
  }, []);
  const {handleSubmit, setValue, reset, control, formState} = useForm<IFormInputs>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(Schema)
  });
  const toast = useToast();
  const {errors} = formState;
  // If update list, do it
  if (data?.name) setValue('name', data.name);

  const onSubmit: SubmitHandler<IFormInputs> = async formData => {
    console.log(formData);
    const {name} = formData;
    if (formState.isSubmitting) return;

    if (data?.id) {
      const {id} = data;
      API.list
        .update({id, name})
        .then(() => {
          toast.show({type: 'success', title: 'Update List', content: 'Successful!'});
          onSave?.();
        })
        .catch(() => {
          toast.show({type: 'danger', title: 'Update List', content: 'Error, Cannot update List'});
        });
    } else {
      API.list
        .create({name})
        .then(() => {
          toast.show({type: 'success', title: 'Create List', content: 'Successful!'});
          onSave?.();
        })
        .catch(() => {
          toast.show({type: 'danger', title: 'Create List', content: 'Error, Cannot create List'});
        });
    }
  };

  useEffect(() => {
    reset(FORM_DEFAULT_VALUES);
  }, [data]);

  return (
    <Modal
      className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')}
      variant="center"
      open={open}
      onClose={() => onCancel?.()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <h3 className="title">{data?.id ? 'Update List' : 'Create New List'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Controller
            name="name"
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <Input
                {...field}
                placeholder="Enter your list name"
                error={errors.name?.message}
                ref={inputRef}
                disabled={formState.isSubmitting}
                onKeyPress={async e => {
                  if (formState.isSubmitting) return;
                  if (e.key === 'Enter') await handleSubmit(onSubmit);
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
              loading={formState.isSubmitting}
              disabled={formState.isSubmitting}
            />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalTodoAddEdit;
