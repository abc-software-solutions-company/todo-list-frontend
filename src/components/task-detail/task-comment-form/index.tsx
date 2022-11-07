import {TextField} from '@mui/material';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';

import style from './style.module.scss';

interface IFormInputs {
  comment: string;
}

interface ITaskCommentFormProp {
  taskData: ITaskResponse;
  onSuccess: () => void;
}

interface IFormInputs {
  comment: string;
}

export const TaskCommentForm = ({taskData, onSuccess}: ITaskCommentFormProp) => {
  const {handleSubmit, setFocus, reset, register} = useForm<IFormInputs>({mode: 'onChange', defaultValues: {comment: ''}});
  const [editComment, setEditComment] = useState(false);
  const toast = useToast();

  const commentInput = {...register('comment')};

  const onClick = () => {
    setEditComment(true);
    setFocus('comment');
  };

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    setEditComment(false);
    if (taskData) {
      api.task
        .update({id: taskData.id, comment: {create: formData}})
        .then(onSuccess)
        .then(() => reset())
        .catch(() => toast.show({type: 'danger', title: 'Comment', content: 'An error occurred, please try again'}));
    }
  };

  return (
    <>
      <div className={style['task-comment']}>
        <div className="title">
          <Icon name="ico-message-circle" />
          <h4>Comments</h4>
        </div>
        {!editComment ? (
          <Input className="comment-text" onClick={onClick} placeholder="Write a comment..." readOnly={true} {...commentInput} />
        ) : (
          <form className="decsription-form" onSubmit={handleSubmit(submitHandler)}>
            <TextField className="w-full bg-white" multiline rows={2} {...commentInput} autoFocus={true} />
            <div className="mt-4 flex gap-4">
              <Button className="w-24" variant="contained" color="primary" text="Comment" type="submit" disabled={!editComment} />
              <Button className="w-24" variant="outlined" color="white" text="Cancel" onClick={() => setEditComment(false)} type="button" />
            </div>
          </form>
        )}
      </div>
    </>
  );
};
