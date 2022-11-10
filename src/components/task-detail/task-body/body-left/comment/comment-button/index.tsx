import {FC, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import useTask from '@/components/task-detail/hooks/use-task';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

import CommentForm, {IFormInputs} from '../comment-form';

const CommentButton: FC = () => {
  const form = useForm<IFormInputs>({mode: 'onChange'});
  const {reset, handleSubmit} = form;
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const {task, update} = useTask();

  const onClick = () => setIsEditing(true);

  const onClose = () => setIsEditing(false);

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    onClose();
    if (task) {
      api.task
        .update({id: task.id, comment: {create: formData}})
        .then(update)
        .then(() => reset())
        .catch(() => toast.show({type: 'danger', title: 'Comment', content: 'An error occurred, please try again'}));
    }
  };

  const onSubmit = handleSubmit(submitHandler);

  if (isEditing) return <CommentForm {...{form, onSubmit, onClose}} />;
  else return <Input className="comment-btn" onClick={onClick} placeholder="Write a comment..." readOnly={true} />;
};

export default CommentButton;
