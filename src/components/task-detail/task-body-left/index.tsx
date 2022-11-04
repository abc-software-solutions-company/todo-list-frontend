import {TextField} from '@mui/material';
import {ChangeEvent, useState} from 'react';

import UploadImage from '@/components/task-detail/upload-image';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import {IAttachment, IAttachmentResponse, ITaskResponse} from '@/data/api/types/task.type';

import {TaskDescription} from '../task-description';
import TaskImages from '../task-images';
import style from './style.module.scss';

interface ITaskBodyLeftProp {
  taskData: ITaskResponse;
  updateTaskData: () => void;
}

export const TaskBodyLeft = ({taskData, updateTaskData}: ITaskBodyLeftProp) => {
  const toast = useToast();

  const [previewImages, setPreviewImages] = useState<IAttachment[]>([]);

  const taskImages = taskData.taskAttachments?.filter(e => e.isActive).map(e => e.attachment);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const images = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const element = e.target.files[i];
        if (element.type.startsWith('image')) images.push({name: element.name, link: URL.createObjectURL(element)});
        else {
          toast.show({type: 'danger', title: 'Error', content: 'Warning, this is not image file'});
        }
      }
      setPreviewImages(images);
    }
  };

  const onSuccess = () => {
    console.log('🚀 ~ file: index.tsx ~ line 62 ~ onSuccess ~ onSuccess');
    updateTaskData();
    setPreviewImages([]);
    toast.show({type: 'success', title: 'success', content: 'Update Image Successfull'});
  };

  const onError = () => {
    console.log('🚀 ~ file: index.tsx ~ line 67 ~ onError ~ onError', onError);
    setPreviewImages([]);
    toast.show({type: 'danger', title: 'Error', content: 'Warning your file must be image and maximum size is 5MB'});
  };

  return (
    <div className={style['task-body-left']}>
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
