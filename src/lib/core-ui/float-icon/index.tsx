import classnames from 'classnames';
import React, {FC} from 'react';

interface IProps {
  className?: string;
  onClick?: () => void;
}

const FloatIcon: FC<IProps> = ({className, onClick}) => {
  return (
    <div className={classnames('abc-btn-float', className)} onClick={onClick}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" width="6" height="30" rx="3" fill="#FFFFFF" />
        <rect y="12" width="30" height="6" rx="3" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

export default FloatIcon;
