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

const taskCommentList: ITaskCommentProp[] = [
  {
    userName: 'gjlasgnlasjk',
    date: 'gfknglank',
    content: '21/1/2000'
  },
  {userName: 'Huy', content: 'Task Comment 2', date: '21/1/2000'}
];

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
      <div className="container">
        <div className="inner">
          <div className="com-task-description py-5">
            <TaskDescription taskData={taskData} updateTaskData={updateTaskData} />
          </div>
          <div className="com-task-attachment py-5">
            <div className="title">
              <Icon name="ico-attachment" />
              <h4>Attachments</h4>
            </div>
            <TaskImages className="task-images" attachments={taskImages} {...{taskData, updateTaskData}} />
            <TaskImages className="task-images-upload" attachments={previewImages as IAttachmentResponse[]} />
            <UploadImage {...{taskData, onUpload, previewImages, onSuccess, onError}} />
          </div>
          <div className="com-task-comment-form py-5">
            <TaskCommentForm />
          </div>
          <div className="com-task-comment-list py-5">
            <TaskCommentList commentList={taskCommentList} />
          </div>
        </div>
      </div>
    </div>
  );
};
