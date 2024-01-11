import DateCol from '@/components/upcoming/date-col';
import UpcomingTop from '@/components/upcoming/upcoming-top';
import React, {CSSProperties, FC, useEffect} from 'react';
import useTodolist from '@/states/todolist/use-todolist';

interface IUpcomingProps {
  className?: string | undefined;
}

const Upcoming: FC<IUpcomingProps> = ({className}) => {
  const {todolist, getTodolist} = useTodolist();
  const currentDay = new Date();
  const limit = 5;

  useEffect(() => {
    getTodolist;
  }, []);

  const getNext5Days = () => {
    const next5Days = [];
    for (let i = 0; i <= limit; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentDay.getDate() + i);
      next5Days.push(nextDate);
    }
    return next5Days;
  };

  const renderDateCols = () => {
    const next5Days = getNext5Days();
    if (!todolist.tasks) {
      return next5Days.map((date, index) => <DateCol key={index} date={date} taskLists={[]} />);
    }

    return next5Days.map((date, index) => {
      const currentDayTasks = todolist.tasks.filter(task => {
        const taskDate = new Date(task.createdDate);
        return (
          taskDate.getDate() === date.getDate() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getFullYear() === date.getFullYear()
        );
      });

      return <DateCol key={index} date={date} taskLists={currentDayTasks} />;
    });
  };

  return (
    <div className={className}>
      <UpcomingTop />
      <div className="mt-24 flex">{renderDateCols()}</div>
    </div>
  );
};

export default Upcoming;
