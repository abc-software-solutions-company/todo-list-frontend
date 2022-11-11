import {FC} from 'react';

import useTask from '@/components/task-detail/hooks/use-task';
import Input from '@/core-ui/input';

interface IDescriptionButtonProps {
  onClick: () => void;
}

const DescriptionButton: FC<IDescriptionButtonProps> = ({onClick}) => {
  const {task} = useTask();
  const {description} = task;

  if (description) return <div className="description-text" onClick={onClick} dangerouslySetInnerHTML={{__html: description}}></div>;
  else return <Input className="border-0 bg-slate-100" onClick={onClick} placeholder="Add a description..." readOnly />;
};

export default DescriptionButton;
