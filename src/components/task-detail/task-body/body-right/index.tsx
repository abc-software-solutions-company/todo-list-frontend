import classNames from 'classnames';
import {FC} from 'react';

import useTodolist from '@/states/todolist/use-todolist';
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
  const {write: isWrite, owner} = useTodolist();
  return (
    <div className={className}>
      <div className={classNames(style['body-right'], `body-right ${!(isWrite || owner) && style['read-only']}`)}>
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
