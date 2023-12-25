import {FC} from 'react';
import Icon from '@/core-ui/icon';
import {ISetActivity} from '../activity/type';

interface IActiTopContent {
  type: ISetActivity;
}

const ActiTopContent: FC<IActiTopContent> = ({type}) => {
  if (type === 'projects') {
    return (
      <>
        <p className="text-sm leading-6">Current Projects</p>
        <Icon name="ico-folder-open" />
      </>
    );
  } else if (type === 'tasks') {
    return (
      <>
        <p className="text-sm leading-6">Task to day</p>
        <Icon name="ico-file-list-check" />
      </>
    );
  }
  return (
    <>
      <p className="text-sm leading-6">Work productivity</p>
      <Icon name="ico-file-list-check" />
    </>
  );
};

export default ActiTopContent;
