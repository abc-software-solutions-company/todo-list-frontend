import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

import Comment from '../body-left/comment';
import Status from '../status';
// import Assignee from './assignee';
// import Date from './date';
// import Point from './point';
import Priority from './priority';
import style from './style.module.scss';
import TimeState from './time-state';

const BodyRight: FC<IBaseProps> = ({className}) => {
  return (
    <div className={className}>
      <div className={classNames(style['body-right'], 'body-right')}>
        <Status className="divide item" />
        {/* <Assignee className="divide item mobile" /> */}
        <Priority className="divide item mobile" />
        {/* <Point className="divide item mobile" /> */}
        {/* <Date className="divide item" /> */}
        <Comment className="divide item lg:hidden" />
        <TimeState className="item" />
      </div>
    </div>
  );
};

export default BodyRight;
