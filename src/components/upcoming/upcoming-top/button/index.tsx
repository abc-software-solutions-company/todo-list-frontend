import React, {CSSProperties, FC} from 'react';
import Icon from '@/core-ui/icon';

interface IUpcomingBtnProps {
  className?: string | undefined;
  content: React.ReactNode;
}

const UpcomingBtn: FC<IUpcomingBtnProps> = ({className, content}) => {
  return (
    <div className={`${className} flex h-14 items-center justify-center bg-gray-200 text-gray-500`}>
      <div className="mt-1">{content}</div>
    </div>
  );
};

export default UpcomingBtn;
