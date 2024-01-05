import {FC} from 'react';
import { ISetActivity } from '../activity/type';
import ActiBottomContent from '../acti-content/ActiBottomContent';

interface IActiBottom {
  type: ISetActivity;
}

const ActiBottom: FC<IActiBottom> = ({type}) => {
  
  return (
    <div className="flex items-start justify-between self-stretch w-full">
      <ActiBottomContent type={type} />
    </div>
  );
};

export default ActiBottom;
