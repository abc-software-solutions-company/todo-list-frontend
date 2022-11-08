import {ButtonBase, Popover, TextField} from '@mui/material';
import {FC, MouseEvent, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ICommentResponse} from '@/data/api/types/task.type';
import {getDate} from '@/utils/get-date';

interface IFormInputs {
  comment: string;
}

interface ITaskCommentProps {
  commentData: ICommentResponse;
  onSuccess?: () => void;
}
const TaskComment: FC<ITaskCommentProps> = ({commentData, onSuccess}) => {
  const {id, taskId, comment, user, createdDate, updatedDate} = commentData;
  const toast = useToast();
  const {handleSubmit, reset, register} = useForm<IFormInputs>({mode: 'onChange'});

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [editComment, setEditComment] = useState(false);
  const time = getDate(new Date(createdDate));

  const open = Boolean(anchorEl);
  const editButtonId = open ? 'simple-popover' : undefined;

  const onDelete = () => {
    api.task.update({id: taskId, comment: {update: {id, isActive: false}}}).then(onSuccess);
  };

  const onEdit = () => {
    setEditComment(true);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    setEditComment(false);
    api.task
      .update({id: taskId, comment: {update: {id, comment: formData.comment}}})
      .then(onSuccess)
      .then(() => reset())
      .catch(() => toast.show({type: 'danger', title: 'Comment', content: 'An error occurred, please try again'}));
  };

  return (
    <div className="task-comment">
      <div className="left">
        <Icon name="ico-user" />
      </div>
      <div className="right">
        <div className="user">
          <p>{user.name}</p>
          <div className="time">{createdDate !== updatedDate ? time + ' (edited)' : time}</div>
        </div>
        <div className="content">
          {!editComment ? (
            <p>{comment}</p>
          ) : (
            <form className="decsription-form" onSubmit={handleSubmit(submitHandler)}>
              <TextField className="w-full bg-white" multiline rows={2} {...register('comment')} autoFocus={true} defaultValue={comment} />
              <div className="mt-4 flex gap-4">
                <Button className="w-24" variant="contained" color="primary" text="Comment" type="submit" />
                <Button className="w-24" variant="outlined" color="white" text="Cancel" onClick={() => setEditComment(false)} type="button" />
              </div>
            </form>
          )}
        </div>
        {!editComment && (
          <div className="actions">
            <button onClick={onEdit}>Edit</button>
            <span>-</span>
            <ButtonBase aria-describedby={editButtonId} onClick={event => handleClick(event)}>
              Delete
            </ButtonBase>
            <Popover
              id={editButtonId}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
            >
              <div className="p-5 text-center">
                <p>Do you want to be sure to delete this comment</p>
                <div className="mt-2 flex justify-center gap-5">
                  <Button color="primary" variant="contained" className="w-[66px] py-1 px-2" type="submit" onClick={onDelete}>
                    Yes
                  </Button>
                  <Button color="secondary" variant="outlined" className="py-1 px-2" type="submit" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskComment;