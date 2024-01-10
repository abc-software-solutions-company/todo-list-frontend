import DateCol from '@/components/upcoming/date-col';
import UpcomingTop from '@/components/upcoming/upcoming-top';
import React, {CSSProperties, FC, useEffect} from 'react';

interface IUpcomingProps {
  className?: string | undefined;
}

const Upcoming: FC<IUpcomingProps> = ({className}) => {
  const currentDay = new Date();
  const limit = 5;

  const getNext5Days = () => {
    const next5Days = [];
    for (let i = 1; i <= limit; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentDay.getDate() + i);
      next5Days.push(nextDate);
    }
    return next5Days;
  };

  const renderDateCols = () => {
    const next5Days = getNext5Days();
    console.log('🚀 ~ renderDateCols ~ next5Days:', next5Days);
    return next5Days.map((date, index) => <DateCol key={index} date={date} taskLists={[]} />);
  };

  return (
    <div className={className}>
      <UpcomingTop />
      <div className="flex">{renderDateCols()}</div>
    </div>
  );
};

export default Upcoming;
