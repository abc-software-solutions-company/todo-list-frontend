import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

import Comment from '../body-left/comment';
import Status from '../status';
import Priority from './priority';
import StoryPoint from './story-point';
// import Assignee from './assignee';
import style from './style.module.scss';
import TaskDate from './task-date';
import TimeState from './time-state';

const BodyRight: FC<IBaseProps> = ({className}) => {
  return (
    <div className={className}>
      <div className={classNames(style['body-right'], 'body-right')}>
        <Status className="divide item" />
        {/* <Assignee className="divide item mobile" /> */}
        <Priority className="divide item mobile" />
        <TaskDate className="divide item" />
        <StoryPoint className="divide item mobile" />
        <Comment className="divide item lg:hidden" />
        <TimeState className="item" />
      </div>
    </div>
  );
};

export default BodyRight;
