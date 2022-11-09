import {FC, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

import {IBodyLeftProps} from '../..';
import CommentForm, {IFormInputs} from '../comment-form';

const CommentButton: FC<IBodyLeftProps> = props => {
  const {taskData, onSuccess} = props;
  const form = useForm<IFormInputs>({mode: 'onChange'});
  const {reset, handleSubmit} = form;
  const toast = useToast();
  const [isEditting, setIsEditting] = useState(false);

  const onClick = () => {
    setIsEditting(true);
  };

  const onClose = () => {
    setIsEditting(false);
  };

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    onClose();
    if (taskData) {
      api.task
        .update({id: taskData.id, comment: {create: formData}})
        .then(onSuccess)
        .then(() => reset())
        .catch(() => toast.show({type: 'danger', title: 'Comment', content: 'An error occurred, please try again'}));
    }
  };
  const onSubmit = handleSubmit(submitHandler);

  if (isEditting) return <CommentForm {...{form, onSubmit, onClose}} />;
  else return <Input className="comment-btn" onClick={onClick} placeholder="Write a comment..." readOnly={true} />;
};

export default CommentButton;
