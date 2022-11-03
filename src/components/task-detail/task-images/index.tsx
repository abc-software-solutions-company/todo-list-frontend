import {ButtonBase, Popover} from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, MouseEvent, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IAttachmentResponse, ITaskResponse} from '@/data/api/types/task.type';
import {getDate} from '@/utils/get-date';

import style from './style.module.scss';

interface ITaskImagesProps {
  className?: string;
  taskData?: ITaskResponse;
  updateTaskData?: () => void;
  attachments: IAttachmentResponse[];
}
interface IFormInputs {
  name: string;
}
const TaskImages: FC<ITaskImagesProps> = ({attachments, className, taskData, updateTaskData}) => {
  const toast = useToast();
  const [imageSelected, setImageSelected] = useState<number>();

  const {handleSubmit, setValue, setFocus, register} = useForm<IFormInputs>({mode: 'onChange', defaultValues: {name: ''}});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const editButtonId = open ? 'simple-popover' : undefined;

  const handleClick = (event: MouseEvent<HTMLButtonElement>, {id, name}: IAttachmentResponse) => {
    setAnchorEl(event.currentTarget);
    setImageSelected(id);
    setValue('name', name);
    setFocus('name');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submitHandler: SubmitHandler<IFormInputs> = ({name}) => {
    if (taskData && imageSelected)
      api.task
        .update({id: taskData.id, attachments: {edit: {id: imageSelected, name}}})
        .then(updateTaskData)
        .catch(() => toast.show({type: 'danger', title: 'Edit Image', content: 'An error occurred, please try again'}));
    handleClose();
  };
  const onDelete = (imageId: number) => {
    if (taskData)
      api.task
        .update({id: taskData.id, attachments: {remove: {id: imageId}}})
        .then(updateTaskData)
        .catch(() => toast.show({type: 'danger', title: 'Delete Image', content: 'An error occurred, please try again'}));
  };

  if (!attachments || attachments.length < 1) return null;

  return (
    <div className={classNames(className, style['task-images'])}>
      {attachments.map((e, idx) => (
        <div key={idx} className={classNames('task-image', `${!taskData ? 'upload' : ''}`)}>
          <div className="image">
            <Image src={e.link} alt="" objectFit="contain" layout="fill" />
          </div>
          {e.createdDate && (
            <div className="info">
              <div className="info-name">
                <span>{e.name}</span>
                <Icon name="ico-arrow-up-right" />
              </div>
              <div className="info-date"> {'Added ' + getDate(new Date(e.createdDate))}</div>
              <div className="info-actions">
                <ButtonBase aria-describedby={editButtonId} onClick={event => handleClick(event, e)}>
                  Rename
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
                  <form className="p-2" onSubmit={handleSubmit(submitHandler)}>
                    <div className="m-1 border-b text-center">Edit attachment</div>
                    <div className="">Image name:</div>
                    <Input className="my-1 p-1" {...register('name', {required: true})} autoFocus={true} />
                    <Button color="primary" variant="contained" className="py-1 px-2" type="submit">
                      Save
                    </Button>
                  </form>
                </Popover>
                <button onClick={() => onDelete(e.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default TaskImages;
