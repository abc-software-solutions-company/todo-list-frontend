import {TextField} from '@mui/material';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';

import style from './style.module.scss';

export const TaskCommentForm = () => {
  return (
    <div className={style['task-comment-form']}>
      <div className="title">
        <Icon name="ico-message-circle" />
        <h4>Comments</h4>
      </div>
      <form className="comments-form">
        <TextField className=" w-full bg-white" multiline rows={1} />
        <div className="mt-5 flex gap-5">
          <Button className="w-24" variant="contained" color="primary" text="Save" type="submit" />
          <Button className="w-24 text-blue-500" variant="outlined" color="white" text="Close" type="button" />
        </div>
      </form>
    </div>
  );
};
