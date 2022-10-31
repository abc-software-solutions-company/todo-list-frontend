import {yupResolver} from '@hookform/resolvers/yup';
import {TextField} from '@mui/material';
import Image from 'next/image';
import {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/core-ui/button';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';

import UploadImage from '../upload-image';

interface IFormInputs {
  description: string;
}

const Schema = yup.object().shape({
  description: yup.string()
});

interface IProps {
  task: ITaskResponse;
}

const TaskDetail: FC<IProps> = ({task}) => {
  const [taskData, setTaskData] = useState<ITaskResponse>();
  const [editDescription, setEditDescription] = useState(false);
  const {handleSubmit, formState, register} = useForm<IFormInputs>({
    resolver: yupResolver(Schema),
    mode: 'onChange'
  });
  const {isSubmitting} = formState;

  const toast = useToast();
  const updateTaskData = () => {
    api.task.getOne({id: task.id}).then(res => {
      setTaskData({...res.data});
    });
  };

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    if (taskData) {
      api.task
        .update({id: taskData.id, ...formData})
        .then(res => {
          setTaskData(res.data);
          toast.show({type: 'success', title: 'Update Description', content: 'success'});
        })
        .then(() => setEditDescription(false))
        .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}));
    }
  };

  const onSubmit = handleSubmit(submitHandler);

  useEffect(() => {
    updateTaskData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!taskData) return null;

  return (
    <div className="container">
      <h1 className="text-center">{taskData.name}</h1>
      <h2 className="">Description</h2>
      {!editDescription && (
        <div className="break-words rounded-xl bg-gray-100 p-5 hover:bg-gray-200" onClick={() => setEditDescription(true)}>
          {taskData.description || 'No description'}
        </div>
      )}
      {editDescription && (
        <form className="rounded-xl bg-gray-200 p-5" onSubmit={onSubmit}>
          <TextField className=" w-full bg-white" multiline rows={4} {...register('description')} defaultValue={taskData.description} />
          <div className="mt-5 flex gap-5">
            <Button className="w-24" variant="contained" color="primary" text="Save" type="submit" loading={isSubmitting} disabled={isSubmitting} />
            <Button className="w-24" variant="outlined" color="white" text="Cancel" onClick={() => setEditDescription(false)} type="button" />
          </div>
        </form>
      )}
      <h2 className="mt-5">Attachments</h2>
      <div className="flex">
        {' '}
        {taskData.taskImages.map(e => (
          // <img key={e.imageId} src={e.image.link} />
          <Image key={e.imageId} src={e.image.link} alt="" height={200} width={200} />
        ))}
      </div>
      <UploadImage taskData={taskData} onSuccess={updateTaskData} />
    </div>
  );
};

export default TaskDetail;
