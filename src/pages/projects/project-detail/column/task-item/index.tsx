import React, {FC} from 'react';

import Icon from '@/core-ui/icon';
import {IAssigneeResponse} from '@/data/api/types/task.type';
import {IMember} from '@/data/api/types/todolist.type';
import useMemberOptions from '@/hooks/useMemberOptions';

import AssigneeIcon from './assignee-icon';

interface ITaskItem {
  title: string;
  description: string;
  hasBorder?: boolean;
  beforeTitleImageSrc?: string;
  assignees: IAssigneeResponse[];
  afterTitleImageSrc?: string | string[];
  className?: string | undefined;
  members: IMember[];
}

const TaskItem: FC<ITaskItem> = ({
  title,
  assignees,
  description,
  beforeTitleImageSrc,
  afterTitleImageSrc,
  members,
  hasBorder
}) => {
  const assigneeId = assignees.find(e => e.isActive)?.userId;
  const {optionActive} = useMemberOptions(members, assigneeId);

  return (
    <div
      className="flex w-96 items-start justify-center gap-1 rounded-xl bg-neutral-50 p-6"
      style={hasBorder ? {} : {boxShadow: '0 0 4px 0 rgba(0,0,0,.25)'}}
    >
      {/* <div className="inline-flex h-56 w-96 items-start justify-center gap-1 rounded-xl bg-neutral-50 p-6 shadow"> */}
      <div className="mr-2 flex items-start justify-start gap-2.5 p-1">
        <div className="relative h-6 w-6">
          <input type="checkbox" className="h-full w-full rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-1">
        <div className="flex flex-col items-start justify-start gap-3">
          {beforeTitleImageSrc !== undefined && (
            <div className="flex flex-col items-start justify-start gap-3">
              <img className="h-36 w-72 rounded-lg" src={beforeTitleImageSrc} />
            </div>
          )}
          <div className="inline-flex items-center justify-start gap-3 self-stretch">
            <div className="flex items-center justify-start gap-1">
              <div className="text-gray-950 text-xl font-bold leading-normal">{title}</div>
              <div className="inline-flex flex-col items-start justify-center gap-1">
                <div className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-red-600 px-3 py-1">
                  <div className=" text-sm font-semibold leading-tight text-neutral-50">tag</div>
                </div>
              </div>
            </div>
          </div>
          {afterTitleImageSrc !== undefined && (
            <div className="flex items-start justify-start gap-1">
              {typeof afterTitleImageSrc !== 'string' ? (
                afterTitleImageSrc.map((src, index) => (
                  <img key={index} src={src} className="h-32 w-36 rounded-lg"></img>
                ))
              ) : (
                <img src={afterTitleImageSrc} className="h-32 w-72 rounded-lg"></img>
              )}
            </div>
          )}
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="text-gray-950 w-72  text-sm font-normal leading-tight">{description}</div>
            <div className="flex items-center justify-center gap-2 rounded-lg py-1 pr-1">
              <div className="text-sm font-normal leading-tight text-gray-500">17h30</div>
              <div className="relative h-6 w-6">
                <Icon name="ico-calendar" size={24}></Icon>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-end justify-between self-stretch">
          <div className="flex items-center justify-center">
            <div className="relative flex h-8 w-8">
              {/* <div className="absolute z-10 h-[32px] w-[32px] shrink-0 rounded-full bg-sky-300"></div>
              <div className="absolute left-[16px] z-20 h-[32px] w-[32px] shrink-0 rounded-full bg-neutral-600"></div>
              <div className="absolute left-[32px] z-30 h-[32px] w-[32px] shrink-0 rounded-full bg-slate-700"></div>
              <div className="absolute left-[48px] z-40 h-[32px] w-[32px] shrink-0 rounded-full bg-orange-200"></div>
              <div className=" absolute left-[64px] z-50 h-[32px] w-[32px] shrink-0 rounded-full bg-orange-600"></div>
              <div className=" absolute left-[80px] z-[60] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-white">
                <p className="absolute">+4</p>
              </div> */}
              {assignees.map((assignee, index) => (
                <div key={index} className={`absolute left-[${16 * (index + 1)}px]`}>
                  <AssigneeIcon name={optionActive?.name} bg={optionActive?.bg}></AssigneeIcon>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-lg py-1 pr-1">
            <div className=" text-sm font-normal leading-tight text-gray-500">Comment</div>
            <div className="relative h-6 w-6">
              <Icon name="ico-messages" size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 rounded-lg p-1">
        <div className="relative h-6 w-6">
          <Icon name="ico-more-horizontal" size={24} />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
