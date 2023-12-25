import { FC } from 'react';
import Activity from './activity/Activity';

interface IActivities {

}

const Activities: FC = () => {

  return (
    <div className='grid grid-cols-3 gap-3 w-full'>
        <Activity type={'projects'} quantity='200' classes='bg-[#BFDBFE]' />
        <Activity type={'tasks'} quantity='200' classes='bg-[#93C5FD]' />
        <Activity type={'works'} quantity='200' classes='bg-[#BFDBFE]' />
    </div>
  );
};

export default Activities;
