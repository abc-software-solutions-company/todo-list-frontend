import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import PopUpImageDangerous from '@/components/common/popup-img-dangerous';
import useTask from '@/components/task-detail/hooks/use-task';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

import CommentForm from '../../../comment-form';
import {IItemProps} from '..';

interface IFormInputs {
  comment: string;
}

interface Iprops extends IItemProps {
  isEditing: boolean;
  onClose: () => void;
}

const Content: FC<Iprops> = ({comment, isEditing, onClose}) => {
  const {update} = useTask();
  const {id, taskId, comment: content} = comment;
  const toast = useToast();
  const form = useForm<IFormInputs>({mode: 'onChange'});
  const {handleSubmit, reset} = form;
  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    onClose();
    api.task
      .update({id: taskId, comment: {update: {id, comment: formData.comment}}})
      .then(update)
      .then(() => reset())
      .catch(() => toast.show({type: 'danger', title: 'Comment', content: 'An error occurred, please try again'}));
  };

  const onSubmit = handleSubmit(submitHandler);

  return (
    <div className="content prose">
      {!isEditing ? <PopUpImageDangerous rawHTML={content} /> : <CommentForm {...{form, onSubmit, onClose, value: content}} />}
    </div>
  );
};
export default Content;
