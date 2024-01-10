import React, {CSSProperties, FC} from 'react';
import StatisticBox from '@/components/home/daskboard/statistic';

interface IDashboardProps {
  className?: string | undefined;
}

const Dashboard: FC<IDashboardProps> = ({className}) => {
  return (
    <div className={`${className} grid w-full grid-cols-3 gap-3`}>
      <StatisticBox type="CURRENT" title="Current Projects" number={200} percent={122} />
      <StatisticBox type="TODAY" title="Task today" number={15} summary={20} percent={122} />
      <StatisticBox type="WORK" title="Work productivity" number={70} summary={100} percent={122} />
    </div>
  );
};

export default Dashboard;
