import {FC} from 'react';

import Input from '@/core-ui/input';
import useTask from '@/states/task/use-task';
import {wrapperIFrameYoutube} from '@/utils/youtube-ckeditor/wrapper-iframe-youtube';

interface IDescriptionButtonProps {
  onClick: () => void;
  write?: boolean;
}

const DescriptionButton: FC<IDescriptionButtonProps> = ({onClick, write = true}) => {
  const {task} = useTask();
  const {description} = task;

  if (description) return <div className="description-text" onClick={onClick} dangerouslySetInnerHTML={{__html: wrapperIFrameYoutube(description)}}></div>;
  else return <>{write && <Input className="border-0 bg-slate-100" onClick={onClick} placeholder="Add a description..." readOnly />}</>;
};

export default DescriptionButton;
