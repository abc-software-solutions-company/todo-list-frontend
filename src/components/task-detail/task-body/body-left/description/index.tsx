import classNames from 'classnames';
import dynamic from 'next/dynamic';
import {FC, useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

import Title from '../../title';
import {IBodyLeftProps} from '..';

const Editor = dynamic(() => import('@/components/common/ckeditor'), {
  ssr: false
});

interface IFormInputs {
  description: string;
}

const Description: FC<IBodyLeftProps> = ({taskData, onSuccess, className}) => {
  const {handleSubmit, formState, control} = useForm<IFormInputs>({mode: 'onChange', defaultValues: {description: ''}});
  const {isSubmitting} = formState;
  const [editDescription, setEditDescription] = useState(false);
  const toast = useToast();

  const onClick = () => {
    setEditDescription(true);
  };

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    setEditDescription(false);
    if (taskData) {
      api.task
        .update({id: taskData.id, ...formData})
        .then(onSuccess)
        .then(() => toast.show({type: 'success', title: 'Update Description', content: 'success'}))
        .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}));
    }
  };

  useEffect(() => {
    if (taskData && !taskData.description) {
      setEditDescription(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames('description', className)}>
      <Title
        icon={<Icon name="ico-description" />}
        text="Describe"
        rightBtn={!editDescription && <Button text="Edit" className="edit-btn" onClick={onClick} />}
      />
      {!editDescription ? (
        <div className="description-text prose max-w-full" onClick={onClick} dangerouslySetInnerHTML={{__html: taskData.description}}></div>
      ) : (
        <form className="decsription-form" onSubmit={handleSubmit(submitHandler)}>
          <Controller
            name="description"
            control={control}
            rules={{required: false}}
            defaultValue={taskData.description}
            render={({field}) => <Editor name="example" value={taskData.description} onChange={text => field.onChange(text)} />}
          />
          <div className="mt-4 flex gap-4">
            <Button className="h-8 w-20" variant="contained" color="primary" text="Save" type="submit" loading={isSubmitting} disabled={isSubmitting} />
            <Button className="h-8 w-20" variant="outlined" color="white" text="Cancel" onClick={() => setEditDescription(false)} type="button" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Description;
