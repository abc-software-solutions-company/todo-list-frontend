import {ButtonBase, Popover} from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import {FC, MouseEvent, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import PopUpImage from '@/components/common/popup-img';
import Button from '@/core-ui/button';
import IconButton from '@/core-ui/icon-button';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IAttachmentResponse} from '@/data/api/types/task.type';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {getDate} from '@/utils/get-date';
import {ToastContents} from '@/utils/toast-content';

import style from './style.module.scss';

interface IFormInputs {
  name: string;
}
const TaskImages: FC<IBaseProps> = ({className}) => {
  const toast = useToast();
  const [imageSelected, setImageSelected] = useState<number>();
  const {task, write, update} = useTask();

  const attachments = task.attachments.filter(e => e.isActive);

  const {handleSubmit, setValue, setFocus, register} = useForm<IFormInputs>({
    mode: 'onChange',
    defaultValues: {name: ''}
  });
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
        .catch(() => toast.show({type: 'danger', title: 'Edit Image', content: ToastContents.ERROR}));
    onClose();
  };

  const handleDelete = (imageId: number) => {
    if (task)
      api.task
        .update({id: task.id, attachment: {update: {id: imageId, isActive: false}}})
        .then(update)
        .then(onClose)
        .catch(() => toast.show({type: 'danger', title: 'Delete Image', content: ToastContents.ERROR}));
  };

  const onDelete = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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
              {write && (
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
                  <button onClick={onDelete}>Delete</button>
                  <Popover
                    id={editButtonId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={onClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <div className="relative max-w-[320px] p-5 text-h7">
                      <IconButton name="ico-x" className="absolute top-3 right-3" onClick={onClose} />
                      <p className="border-b pb-4 text-center text-slate-500">{`You want to delete comment?`}</p>
                      <p className="mt-3 text-slate-700">{`Comment will be permanently deleted and you won&apos;t be able to undo them`}</p>
                      <div className="mt-2 flex justify-center gap-5">
                        <Button
                          color="primary"
                          variant="contained"
                          className="h-10 w-full"
                          type="submit"
                          onClick={() => handleDelete(e.id)}
                        >
                          Yes
                        </Button>
                      </div>
                    </div>
                  </Popover>
                  <button>
                    <Link href={e.link}>Download</Link>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default TaskImages;
