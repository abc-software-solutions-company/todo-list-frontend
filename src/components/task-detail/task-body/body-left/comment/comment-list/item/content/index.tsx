import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import useToast from '@/core-ui/toast';
import api from '@/data/api';

import CommentForm from '../../../comment-form';
import {IItemProps} from '..';

interface IFormInputs {
  comment: string;
}

interface Iprops extends IItemProps {
  show: boolean;
  onClose: () => void;
}

const Content: FC<Iprops> = ({commentData, onSuccess, show, onClose}) => {
  const {id, taskId, comment} = commentData;
  const toast = useToast();
  const form = useForm<IFormInputs>({mode: 'onChange'});
  const {handleSubmit, reset} = form;
  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    onClose();
    api.task
      .update({id: taskId, comment: {update: {id, comment: formData.comment}}})
      .then(onSuccess)
      .then(() => reset())
      .catch(() => toast.show({type: 'danger', title: 'Comment', content: 'An error occurred, please try again'}));
  };

  const onSubmit = handleSubmit(submitHandler);
  return (
    <div className="content prose">
      {!show ? <div dangerouslySetInnerHTML={{__html: comment}}></div> : <CommentForm {...{form, onSubmit, onClose, value: comment}} />}
    </div>
  );
};
export default Content;
