import UpcomingTop from '@/components/upcoming/upcoming-top';
import React, {CSSProperties, FC} from 'react';

interface IUpcomingProps {
  className?: string | undefined;
}

const Upcoming: FC<IUpcomingProps> = ({className}) => {
  return (
    <div className={className}>
      <UpcomingTop />
    </div>
  );
};

export default Upcoming;
