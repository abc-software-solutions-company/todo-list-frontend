import {ButtonBase, Popover} from '@mui/material';
import classNames from 'classnames';
import Link from 'next/link';
import {FC, MouseEvent, useState} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {getDate} from '@/utils/get-date';
import {ToastContents} from '@/utils/toast-content';

import style from './style.module.scss';

const FileAttachment: FC<IBaseProps> = ({className}) => {
  const toast = useToast();
  const {task, write, update} = useTask();

  const attachments = task.attachments.filter(e => e.isActive);

  const [anchorDeleteEl, setAnchorDeleteEl] = useState<HTMLButtonElement | null>(null);

  const openDelete = Boolean(anchorDeleteEl);
  const deleteButtonId = openDelete ? 'simple-popover' : undefined;

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorDeleteEl(event.currentTarget);
  };

  const onCloseDelete = () => {
    setAnchorDeleteEl(null);
  };

  const handleDelete = (imageId: number) => {
    if (task)
      api.task
        .update({id: task.id, attachment: {update: {id: imageId, isActive: false}}})
        .then(update)
        .then(onCloseDelete)
        .catch(() => toast.show({type: 'danger', title: 'Delete Image', content: ToastContents.ERROR}));
  };

  if (!attachments || attachments.length < 1) return null;

  return (
    <>
      <div className={classNames(className, style['task-attachments'])}>
        {attachments
          .filter(item => item?.type && item.type !== 'image')
          .map((e, idx) => (
            <div key={idx} className={classNames('attachment', `${!task ? 'upload' : ''}`)}>
              <Icon name="ico-file-download" size={48} className="icon-download" />
              {e.createdDate && (
                <div className="info">
                  <div className="info-name">{e.name}</div>
                  <div className="info-date"> {'Added ' + getDate(new Date(e.createdDate))}</div>
                  {write && (
                    <div className="info-actions">
                      <ButtonBase aria-describedby={deleteButtonId} onClick={event => onClick(event)}>
                        Delete
                      </ButtonBase>
                      <Popover
                        open={openDelete}
                        anchorEl={anchorDeleteEl}
                        onClose={onCloseDelete}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left'
                        }}
                      >
                        <div className="relative max-w-[320px] p-5 text-h7">
                          <IconButton name="ico-x" className="absolute top-3 right-3" onClick={onCloseDelete} />
                          <p className="border-b pb-4 text-center text-slate-500">{`You want to delete attachment?`}</p>
                          <p className="mt-3 text-slate-700">{`Attachment will be permanently deleted and you won't be able to undo them`}</p>
                          <div className="mt-2 flex justify-center gap-5">
                            <Button
                              color="white"
                              variant="outlined"
                              className="h-10 w-full"
                              type="submit"
                              onClick={onCloseDelete}
                            >
                              No
                            </Button>
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
    </>
  );
};
export default FileAttachment;
