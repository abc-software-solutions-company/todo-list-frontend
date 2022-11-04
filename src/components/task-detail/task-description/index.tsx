import {TextField} from '@mui/material';
import {SubmitHandler} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';

import {useTaskDescription} from './hook';
import style from './style.module.scss';

interface ITaskDescriptionProp {
  taskData: ITaskResponse;
  updateTaskData: () => void;
}

interface IFormInputs {
  description: string;
}

export const TaskDescription = ({taskData, updateTaskData}: ITaskDescriptionProp) => {
  const {editDescription, handleSubmit, isSubmitting, onClick, register, toast, setEditDescription} = useTaskDescription();

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

  return (
    <>
      <div className={style['task-description']}>
        <div className="title">
          <Icon name="ico-description" />
          <h4>Describe</h4>
          <Button text="Edit" className="edit-btn" onClick={onClick} />
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
      </div>
    </>
  );
};
