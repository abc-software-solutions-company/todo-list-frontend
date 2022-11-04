import {TextField} from '@mui/material';
import {useState} from 'react';

import UploadImage from '@/components/task-detail/upload-image';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import {IAttachment, IAttachmentResponse, ITaskResponse} from '@/data/api/types/task.type';

import {TaskDescription} from '../task-description';
import TaskImages from '../task-images';

interface ITaskBodyLeftProp {
  taskData: ITaskResponse;
  updateTaskData: () => void;
  onUpload: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export const TaskBodyLeft = ({taskData, updateTaskData, onSuccess, onUpload, onError}: ITaskBodyLeftProp) => {
  const [previewImages, setPreviewImages] = useState<IAttachment[]>([]);

  const taskImages = taskData.taskAttachments?.filter(e => e.isActive).map(e => e.attachment);

  return (
    <div className="task-body-left">
      <div className="left">
        <TaskDescription taskData={taskData} updateTaskData={updateTaskData} />
        <div className="title">
          <Icon name="ico-attachment" />
          <h4>Attachments</h4>
        </div>
        <TaskImages className="task-images" attachments={taskImages} {...{taskData, updateTaskData}} />
        <TaskImages className="task-images-upload" attachments={previewImages as IAttachmentResponse[]} />
        <UploadImage {...{taskData, onUpload, previewImages, onSuccess, onError}} />
        <hr />
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
    </div>
  );
};
