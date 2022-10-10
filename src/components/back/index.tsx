import cls from 'classnames';
import React, {FC} from 'react';

import IconButton from '@/lib/core-ui/icon-button';

interface IProps {
  className?: string;
  currentPage: string;
  visibleOn?: string[];
  onClick?: () => void;
}

const Back: FC<IProps> = ({className, currentPage, visibleOn, onClick}) => {
  if (!visibleOn?.includes(currentPage)) return null;
  return (
    <div className={cls('return-to', className)}>
      <IconButton className="px-0" name="ico-arrow-left-circle" size={28} onClick={onClick} />
    </div>
  );
};

export default Back;
