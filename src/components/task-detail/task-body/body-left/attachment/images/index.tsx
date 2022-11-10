import {ButtonBase, Popover} from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, MouseEvent, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import PopUpImage from '@/components/common/popup-img';
import useTask from '@/components/task-detail/hooks/use-task';
import Button from '@/core-ui/button';
import IconButton from '@/core-ui/icon-button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IAttachmentResponse} from '@/data/api/types/task.type';
import {IBaseProps} from '@/types';
import {getDate} from '@/utils/get-date';

import style from './style.module.scss';

interface IFormInputs {
  name: string;
}
const TaskImages: FC<IBaseProps> = ({className}) => {
  const toast = useToast();
  const [imageSelected, setImageSelected] = useState<number>();
  const {task, update} = useTask();

  const attachments = task.attachments.filter(e => e.isActive);

  const {handleSubmit, setValue, setFocus, register} = useForm<IFormInputs>({mode: 'onChange', defaultValues: {name: ''}});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const editButtonId = open ? 'simple-popover' : undefined;

  const onClick = (event: MouseEvent<HTMLButtonElement>, {id, name}: IAttachmentResponse) => {
    setAnchorEl(event.currentTarget);
    setImageSelected(id);
    setValue('name', name);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const submitHandler: SubmitHandler<IFormInputs> = ({name}) => {
    if (task && imageSelected)
      api.task
        .update({id: task.id, attachment: {update: {id: imageSelected, name}}})
        .then(update)
        .catch(() => toast.show({type: 'danger', title: 'Edit Image', content: 'An error occurred, please try again'}));
    onClose();
  };

  const onDelete = (imageId: number) => {
    if (task)
      api.task
        .update({id: task.id, attachment: {update: {id: imageId, isActive: false}}})
        .then(update)
        .catch(() => toast.show({type: 'danger', title: 'Delete Image', content: 'An error occurred, please try again'}));
  };

  if (!attachments || attachments.length < 1) return null;

  return (
    <div className={classNames(className, style['task-images'])}>
      {attachments.map((e, idx) => (
        <div key={idx} className={classNames('task-image', `${!task ? 'upload' : ''}`)}>
          <div className="image">
            <PopUpImage imageList={[e.link]}>
              <Image src={e.link} alt="" objectFit="contain" layout="fill" />
            </PopUpImage>
          </div>
          {e.createdDate && (
            <div className="info">
              <div className="info-name">{e.name}</div>
              <div className="info-date"> {'Added ' + getDate(new Date(e.createdDate))}</div>
              <div className="info-actions">
                <ButtonBase aria-describedby={editButtonId} onClick={event => onClick(event, e)}>
                  Rename
                </ButtonBase>
                <Popover
                  id={editButtonId}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={onClose}
                  onFocus={() => setFocus('name', {shouldSelect: true})}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                >
                  <form className="relative p-5 text-h7" onSubmit={handleSubmit(submitHandler)}>
                    <IconButton name="ico-x" className="absolute right-3 top-3" onClick={onClose} />
                    <div className="border-b pb-4 text-center font-medium text-slate-500">Edit attachment</div>
                    <div className="mt-3 font-bold text-slate-700">Name</div>
                    <Input className="my-2 min-w-[300px] p-1" {...register('name', {required: true})} />
                    <Button color="primary" variant="contained" className="h-8 w-full" type="submit">
                      Update
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
