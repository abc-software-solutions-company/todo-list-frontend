import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

import Comment from '../body-left/comment';
import Status from '../status';
import Assignee from './assignee';
import Priority from './priority';
import Reporter from './reporter';
import StoryPoint from './story-point';
import style from './style.module.scss';
import TaskDate from './task-date';
import TimeState from './time-state';

const BodyRight: FC<IBaseProps> = ({className}) => {
  return (
    <div className={className}>
      <div className={classNames(style['body-right'], 'body-right')}>
        <Status className="divide item" />
        <Reporter className="divide item mobile" />
        <Assignee className="divide item mobile" />
        <Priority className="divide item mobile" />
        <StoryPoint className="divide item mobile" />
        <TaskDate className="divide item" />
        <Comment className="divide item lg:hidden" />
        <TimeState className="item" />
      </div>
    </div>
  );
};

export default BodyRight;
