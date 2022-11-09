import classNames from 'classnames';
import {ChangeEvent, FC, useState} from 'react';

import Upload from '@/components/task-detail/task-body/body-left/attachment/upload';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import {IAttachment, IAttachmentResponse} from '@/data/api/types/task.type';

import Title from '../../title';
import {IBodyLeftProps} from '..';
import TaskImages from './images';
import style from './style.module.scss';

const Attachments: FC<IBodyLeftProps> = props => {
  const {taskData, onSuccess, className} = props;
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

  const onUploadSuccess = () => {
    onSuccess?.();
    setPreviewAttachments([]);
    toast.show({type: 'success', title: 'success', content: 'Update Image Successfull'});
  };

  const onUplaodError = () => {
    setPreviewAttachments([]);
    toast.show({type: 'danger', title: 'Error', content: 'Warning your file must be image and maximum size is 5MB'});
  };

  return (
    <div className={classNames('attachment', className, style.attachment)}>
      <Title icon={<Icon name="ico-paperclip" />} text="Attachments" />
      <TaskImages className="mb-4 flex sm:hidden" attachments={previewAttachments as IAttachmentResponse[]} />
      <TaskImages className="task-images" {...{attachments, taskData, onSuccess}} />
      <TaskImages className="mt-4 hidden sm:flex" attachments={previewAttachments as IAttachmentResponse[]} />
      <Upload className={style.upload} {...{taskData, onUpload, onSuccess: onUploadSuccess, onError: onUplaodError, previewAttachments}} />
    </div>
  );
};
export default Attachments;
