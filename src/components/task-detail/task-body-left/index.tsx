import {ChangeEvent, useState} from 'react';

import UploadImage from '@/components/task-detail/upload-image';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import {IAttachment, IAttachmentResponse, ITaskResponse} from '@/data/api/types/task.type';

import {TaskCommentForm} from '../task-comment-form';
import {TaskCommentList} from '../task-comment-list';
import {TaskDescription} from '../task-description';
import TaskImages from '../task-images';
import style from './style.module.scss';

interface ITaskBodyLeftProp {
  taskData: ITaskResponse;
  updateTaskData: () => void;
}

export interface ITaskCommentProp {
  userName: string;
  date: string;
  content: string;
}

export const TaskBodyLeft = ({taskData, updateTaskData}: ITaskBodyLeftProp) => {
  console.log('🚀 ~ file: index.tsx ~ line 35 ~ TaskBodyLeft ~ taskData', taskData);
  const toast = useToast();

  const [previewAttachments, setPreviewAttachments] = useState<IAttachment[]>([]);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadAttachments = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const element = e.target.files[i];
        if (element.type.startsWith('image')) uploadAttachments.push({name: element.name, link: URL.createObjectURL(element)});
        else {
          toast.show({type: 'danger', title: 'Error', content: 'Warning, this is not image file'});
        }
      }
      setPreviewAttachments(uploadAttachments);
    }
  };
  const attachments = taskData.attachments.filter(e => e.isActive);

  const onSuccess = () => {
    console.log('🚀 ~ file: index.tsx ~ line 62 ~ onSuccess ~ onSuccess');
    updateTaskData();
    setPreviewAttachments([]);
    toast.show({type: 'success', title: 'success', content: 'Update Image Successfull'});
  };

  const onError = () => {
    console.log('🚀 ~ file: index.tsx ~ line 67 ~ onError ~ onError', onError);
    setPreviewAttachments([]);
    toast.show({type: 'danger', title: 'Error', content: 'Warning your file must be image and maximum size is 5MB'});
  };

  return (
    <div className={style['task-body-left']}>
      <div className="container">
        <div className="inner">
          <div className="com-task-description py-5">
            <TaskDescription taskData={taskData} onSuccess={updateTaskData} />
          </div>
          <div className="com-task-attachment py-5">
            <div className="title">
              <Icon name="ico-attachment" />
              <h4>Attachments</h4>
            </div>
            <TaskImages className="task-images" {...{attachments, taskData, onSuccess: updateTaskData}} />
            <TaskImages className="task-images-upload" attachments={previewAttachments as IAttachmentResponse[]} />
            <UploadImage {...{taskData, onUpload, onSuccess, onError, previewAttachments}} />
          </div>
          <div className="com-task-comment py-5">
            <TaskCommentForm taskData={taskData} onSuccess={updateTaskData} />
            <TaskCommentList taskData={taskData} onSuccess={updateTaskData} />
          </div>
        </div>
      </div>
    </div>
  );
};
