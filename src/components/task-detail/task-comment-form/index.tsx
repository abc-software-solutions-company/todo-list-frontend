import {TextField} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface IFormInputs {
  comment: string;
}

export const TaskCommentForm = () => {
  const {handleSubmit, formState, register} = useForm<IFormInputs>({mode: 'onChange'});
  const {isSubmitting} = formState;

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    console.log(formData);
  };

  return (
    <div className={style['task-comment-form']}>
      <div className="title">
        <Icon name="ico-message-circle" />
        <h4>Comments</h4>
      </div>
      <form className="comments-form" onSubmit={handleSubmit(submitHandler)}>
        <TextField className=" w-full bg-white" multiline rows={1} {...register('comment')} />
        <div className="mt-5 flex gap-5">
          <Button className="w-24" variant="contained" color="primary" text="Save" type="submit" loading={isSubmitting} disabled={isSubmitting} />
          <Button className="w-24 text-blue-500" variant="outlined" color="white" text="Close" type="button" />
        </div>
      </form>
    </div>
  );
};
