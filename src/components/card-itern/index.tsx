import ListEllipse from '@/components/common/icons/list-ellipse';
import Icon from '@/core-ui/icon';
import {ProgressBar} from '@/core-ui/progress-bar';
import Image from 'next/image';
import {FC, useEffect, useState} from 'react';
import styles from './style.module.scss';
import cls from 'classnames';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {calculatePercentage, countNumberProjectDone, countTotalTasks} from './utils';

interface ICard {
  project?: ITodolistResponse;
}

const Card: FC<ICard> = ({project}) => {
  return (
    <div className={cls(styles['card-item'], 'card-item')}>
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start gap-[21px]">
          <p className="text-gray-950 text-xl leading-6">{project?.name}</p>
          <span className="text-sm leading-5 text-gray-500">Due date: March 30, 2023</span>
        </div>
        <Icon name="ico-codepen" size={64} />
      </div>
      <div className="flex items-center justify-between self-stretch">
        <div className="flex items-center justify-center gap-3">
          <Image width={32} height={32} className="images-stack" src={''} alt="user" />
          <Image width={32} height={32} className="images-stack" src={''} alt="user" />
          <Image width={32} height={32} className="images-stack" src={''} alt="user" />
          <div className="-mx-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
            <p className="text-gray-700">+4</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-green-500">
          <ListEllipse fill="#22C55E" />
          <p className="text-sm">Completed</p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 self-stretch">
        <ProgressBar
          progress={calculatePercentage({
            taskDone: countNumberProjectDone(project?.tasks),
            taskTotal: countTotalTasks(project?.tasks)
          })}
        />
        <div className="flex items-center justify-between self-stretch">
          <p className="text-sm">
            {countNumberProjectDone(project?.tasks)}/{countTotalTasks(project?.tasks)} Total Tasks
          </p>
          <p className="text-sm text-gray-500">
            {calculatePercentage({
              taskDone: countNumberProjectDone(project?.tasks),
              taskTotal: countTotalTasks(project?.tasks)
            })}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
