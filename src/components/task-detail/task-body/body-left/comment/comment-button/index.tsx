import {FC, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {syncAttachments} from '@/utils/sync-attachment';
import {ToastContents} from '@/utils/toast-content';

import CommentForm, {IFormInputs} from '../comment-form';

const CommentButton: FC = () => {
  const form = useForm<IFormInputs>({mode: 'onChange'});
  const {reset, handleSubmit} = form;
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const {task, write, update} = useTask();

  const onClick = () => setIsEditing(true);

  const onClose = () => setIsEditing(false);

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (formData.comment.includes('<img>')) {
      toast.show({type: 'warning', title: 'Warning', content: 'Image is still upload, please be patient'});
      return;
    }
    if (task) {
      api.task
        .update({id: task.id, comment: {create: formData}})
        .then(update)
        .then(() => {
          syncAttachments({id: task.id, listAttachment: task.attachments, rawHTML: formData.comment, update});
        })
        .then(() => reset())
        .then(() => onClose())
        .catch(() => toast.show({type: 'danger', title: 'Comment', content: ToastContents.ERROR}));
    }
  };

  const onSubmit = handleSubmit(submitHandler);

  if (!write) return null;
  if (isEditing) return <CommentForm {...{form, onSubmit, onClose}} />;
  else return <Input className="comment-btn" onClick={onClick} placeholder="Write a comment..." readOnly={true} />;
};

export default CommentButton;
