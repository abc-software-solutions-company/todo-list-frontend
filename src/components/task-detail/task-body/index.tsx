import {SelectChangeEvent, TextField} from '@mui/material';
import classNames from 'classnames';
import {ChangeEvent, FC, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import UploadImage from '@/components/task-detail/upload-image';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IAttachment, IAttachmentResponse, ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';

import {TaskBodyRight} from '../task-body-right';
import TaskImages from '../task-images';
import style from './style.module.scss';

interface ITaskBodyProps {
  className?: string;
  taskData: ITaskResponse;
  updateTaskData: () => void;
}

interface IFormInputs {
  description: string;
}

const TaskBody: FC<ITaskBodyProps> = ({taskData, updateTaskData, className}) => {
  const [previewImages, setPreviewImages] = useState<IAttachment[]>([]);
  const [editDescription, setEditDescription] = useState(false);
  const {handleSubmit, formState, register} = useForm<IFormInputs>({mode: 'onChange'});
  const {isSubmitting} = formState;

  const toast = useToast();

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (taskData) {
      api.task
        .update({id: taskData.id, ...formData})
        .then(() => {
          updateTaskData();
          toast.show({type: 'success', title: 'Update Description', content: 'success'});
        })
        .then(() => setEditDescription(false))
        .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}));
    }
  };

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
  const onClick = () => setEditDescription(true);
  const taskImages = taskData.taskAttachments?.filter(e => e.isActive).map(e => e.attachment);

  const onChangeStatus = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: taskData.id, statusId: Number(event.target.value)})
      .then(updateTaskData)
      .then(socketUpdateList)
      .catch(() => {});
  };

  return (
    <div className={classNames(style['task-body'], className)}>
      <div className="left">
        <div className="title">
          <Icon name="ico-description" />
          <h4>Describe</h4>
          <Button text="Edit" className="edit-btn" onClick={onClick} />
          {/* {Boolean(taskData.description) && (
          <button className={classNames('edit-btn', `${editDescription ? 'hidden' : ''}`)} onClick={onClick}>
            Edit
          </button>
        )} */}
        </div>
        {!editDescription ? (
          <div className="description-text" onClick={onClick}>
            {taskData.description || 'No description'}
          </div>
        ) : (
          <form className="decsription-form" onSubmit={handleSubmit(submitHandler)}>
            <TextField className="w-full bg-white" multiline rows={4} {...register('description')} defaultValue={taskData.description} />
            <div className="mt-4 flex gap-4">
              <Button className="w-24" variant="contained" color="primary" text="Save" type="submit" loading={isSubmitting} disabled={isSubmitting} />
              <Button className="w-24" variant="outlined" color="white" text="Cancel" onClick={() => setEditDescription(false)} type="button" />
            </div>
          </form>
        )}

        <hr />

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
      <TaskBodyRight onChange={onChangeStatus} taskData={taskData} />
    </div>
  );
};
export default TaskBody;
