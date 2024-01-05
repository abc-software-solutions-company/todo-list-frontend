import {FC} from 'react';
import { ISetActivity } from '../activity/type';
import ActiTopContent from '../acti-content/ActiTopContent';

interface IActiTop {
  type: ISetActivity;
}

const ActiTop: FC<IActiTop> = ({type}) => {
  
  return (
    <div className="flex items-start justify-between self-stretch w-full">
      <ActiTopContent type={type} />
    </div>
  );
};

export default ActiTop;
