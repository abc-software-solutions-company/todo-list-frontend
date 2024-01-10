import React, {CSSProperties, FC} from 'react';
import Icon from '@/core-ui/icon';

interface ITaskItemLineProps {
  className?: string | undefined;
  title: string;
  description: string;
  createDate: string;
  project: string;
  tagName: string;
  tagColor: string;
}

const TaskItemLine: FC<ITaskItemLineProps> = ({
  className,
  title,
  description,
  createDate,
  tagName,
  tagColor,
  project
}) => {
  return (
    <div className={`${className} group flex h-32 w-full items-start justify-start gap-6 border-b border-gray-400 p-3`}>
      <div className="flex h-28 shrink grow basis-0 items-start justify-start gap-1">
        <div className="flex items-center justify-center gap-2.5 p-1">
          <div className="flex items-start justify-start gap-2.5">
            <Icon name="drag-vertical" className="ico-drag-vertical opacity-0 group-hover:opacity-100" size={24} />
            <input type="checkbox" className="h-5 w-5 rounded-full border border-gray-400" />
          </div>
        </div>
        <div className="flex h-28 shrink grow basis-0 items-start justify-between">
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="flex items-center justify-start gap-4">
              <div className=" text-xl font-bold leading-normal text-gray-900">{title}</div>
              <div className="flex flex-col items-start justify-center gap-1">
                <div className={`${tagColor} flex items-center justify-center gap-2.5 rounded-lg px-3 py-1`}>
                  <div className=" text-sm font-semibold leading-tight text-neutral-50">{tagName}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="h-16 w-72  text-sm font-normal leading-tight text-gray-500">{description}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-11">
            <div className="flex items-center justify-center gap-2 rounded-lg p-1">
              <div className="h-6 w-6">
                <Icon name="" className="ico-more-horizontal" />
              </div>
            </div>
            <div className="flex items-end justify-start gap-1">
              <div className="flex items-center justify-center gap-2 rounded-lg py-1 pr-1">
                <div className="text-gray-950 text-sm font-normal leading-tight">{createDate}</div>
                <div className="h-6 w-6">
                  <Icon name="" className="ico-calendar" />
                </div>
              </div>
              <div className="flex items-center justify-start gap-0.5 self-stretch">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <div className="flex items-center justify-center gap-2 rounded-lg p-1">
                  <div className="text-gray-950 text-sm font-normal leading-tight">{project}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItemLine;
