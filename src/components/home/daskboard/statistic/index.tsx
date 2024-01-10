import React, {CSSProperties, FC} from 'react';
import Icon from '@/core-ui/icon';
import ErrorInformation from '@/components/common/404';

interface IStatisticBoxProps {
  className?: string | undefined;
  title: string;
  number: number;
  summary?: number;
  percent: number;
  type: 'CURRENT' | 'TODAY' | 'WORK';
}

const StatisticBox: FC<IStatisticBoxProps> = ({className, title, number, summary, percent, type}) => {
  let bgColor = '';

  switch (type) {
    case 'CURRENT':
      bgColor = 'bg-blue-100';
      break;
    case 'TODAY':
      bgColor = 'bg-blue-100';
      break;
    case 'WORK':
      bgColor = 'bg-blue-100';
      break;
  }

  return (
    <div className="flex h-64 w-96 flex-col items-start justify-start gap-11 rounded-lg border border-gray-300 bg-neutral-50 p-10">
      <div className="flex h-20 flex-col items-start justify-start gap-3 self-stretch">
        <div className="flex h-7 flex-col items-start justify-start gap-6 self-stretch">
          <div className="flex items-start justify-between self-stretch">
            <div className="text-gray-950 text-2xl font-normal leading-7">{title}</div>
            <div className="relative h-6 w-6" />
          </div>
        </div>
        <div className="flex items-center justify-start gap-64">
          <div className="text-gray-950 text-3xl font-semibold leading-9">
            {number}
            {summary && <span className="text-gray-950 text-2xl font-bold leading-7">/20</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between self-stretch">
        <div className="flex items-center justify-start gap-1 rounded-3xl bg-blue-100 p-1">
          <div className="text-gray-950 text-sm font-normal leading-tight">+{percent}%</div>
          <div className="relative h-6 w-6">
            <Icon name="trend-up" className="ico-trend-up" />
          </div>
        </div>
        <div className="relative h-16 w-28">
          <div className="absolute left-[72.96px] top-[7px] h-14 w-0.5"></div>
        </div>
      </div>
    </div>
  );
};

export default StatisticBox;
