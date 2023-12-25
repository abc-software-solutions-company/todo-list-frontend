import {FC} from 'react';
import Icon from '@/core-ui/icon';
import {ISetActivity} from '../activity/type';

interface IActiBottomContent {
  type: ISetActivity;
}

const ActiBottomContent: FC<IActiBottomContent> = ({type}) => {
  if (type === 'projects')
    return (
      <>
        <p className="text-4xl font-semibold leading-9">200</p>
        <div className="flex items-center gap-1">
          <p className="text-sm font-sans">+122%</p>
          <Icon name="ico-trend-up" />
        </div>
      </>
    );
  else if (type === 'tasks')
    return (
      <>
        <p className="text-4xl font-semibold leading-9">15/20</p>
        <div className="flex items-center gap-1">
          <p className="text-sm">+122%</p>
          <Icon name="ico-trend-up" />
        </div>
      </>
    );
  return (
    <>
      <p className="text-4xl font-semibold leading-9">70/100</p>
      <div className="flex items-center gap-1">
        <p className="text-sm">-0.22%</p>
        <Icon name="ico-trend-down" />
      </div>
    </>
  );
};

export default ActiBottomContent;
