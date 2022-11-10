import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

import Status from '../status';
import Attachments from './attachment';
import Comment from './comment';
import Description from './description';
import style from './style.module.scss';

export interface IItemProp {
  userName: string;
  date: string;
}

const BodyLeft: FC<IBaseProps> = ({className}) => {
  return (
    <div className={className}>
      <div className={classNames(style['body-left'], 'body-left')}>
        <Status className="divide item" noTitle={true} />
        <Description className="divide item" />
        <Attachments className="divide item" />
        <Comment className="divide item" />
      </div>
    </div>
  );
};

export default BodyLeft;
