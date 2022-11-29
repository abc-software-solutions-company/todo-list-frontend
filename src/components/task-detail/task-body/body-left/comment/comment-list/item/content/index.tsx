import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import PopUpImageDangerous from '@/components/common/popup-img-dangerous';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {syncAttachments} from '@/utils/sync-attachment';
import {wrapperIFrameYoutube} from '@/utils/youtube-ckeditor/wrapper-iframe-youtube';

import CommentForm from '../../../comment-form';
import {IItemProps} from '..';
import style from './styles.module.scss';

interface IFormInputs {
  comment: string;
}

interface Iprops extends IItemProps {
  isEditing: boolean;
  onClose: () => void;
}

const Content: FC<Iprops> = ({comment, isEditing, onClose}) => {
  const {update, task} = useTask();
  const {id, taskId, comment: content} = comment;
  const toast = useToast();
  const form = useForm<IFormInputs>({mode: 'onChange'});
  const {handleSubmit, reset} = form;
  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (formData.comment.includes('<img>')) {
      toast.show({type: 'warning', title: 'Warning', content: 'Image is still upload, please be patient'});
      return;
    }
    api.task
      .update({id: taskId, comment: {update: {id, comment: formData.comment}}})
      .then(update)
      .then(() => {
        syncAttachments({id: task.id, listAttachment: task.attachments, rawHTML: formData.comment, update});
      })
      .then(() => reset())
      .then(() => onClose())
      .catch(() => toast.show({type: 'danger', title: 'Comment', content: 'An error occurred, please try again'}));
  };

  const onSubmit = handleSubmit(submitHandler);

  return (
    <div className={style['comment-content']}>
      {!isEditing ? (
        <div className="content">
          <PopUpImageDangerous rawHTML={wrapperIFrameYoutube(content)} />
        </div>
      ) : (
        <CommentForm {...{form, onSubmit, onClose, value: content}} />
      )}
    </div>
  );
};
export default Content;
