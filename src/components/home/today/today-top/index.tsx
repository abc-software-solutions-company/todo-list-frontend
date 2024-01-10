import Icon from '@/core-ui/icon';
import React, {CSSProperties, FC} from 'react';

interface ITodayTopProps {
  className?: string | undefined;
  viewMode: boolean;
  setViewMode: () => void;
}

const TodayTop: FC<ITodayTopProps> = ({className, viewMode, setViewMode}) => {
  return (
    <div className="flex h-14 w-full items-center justify-between">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="flex w-96 items-center justify-start gap-5">
          <div className="relative h-6 w-6">
            <Icon name="calendar-check" className="ico-calendar-check"></Icon>
          </div>
          <div className="text-gray-950 text-3xl font-bold leading-9">Today</div>
        </div>
      </div>
      <div
        className="flex h-14 items-center justify-center gap-2 rounded-lg px-3 py-4 hover:cursor-pointer hover:border hover:border-slate-500 hover:opacity-80"
        onClick={setViewMode}
      >
        <div className="relative h-6 w-6">
          <Icon name="sliders-horizontal" className="ico-sliders-horizontal"></Icon>
        </div>
        <div className="text-lg font-semibold leading-normal text-gray-700">{viewMode ? 'See all' : 'View'}</div>
      </div>
    </div>
  );
};

export default TodayTop;
