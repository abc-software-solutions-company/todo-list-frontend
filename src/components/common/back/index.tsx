import cls from 'classnames';
import React, {FC} from 'react';

import IconButton from '@/core-ui/icon-button';

import style from './style.module.scss';

interface IProps {
  className?: string;
  currentPage: string;
  visibleOn?: string[];
  onClick?: () => void;
}

const Back: FC<IProps> = ({className, currentPage, visibleOn, onClick}) => {
  if (!visibleOn?.includes(currentPage)) return null;
  return (
    <div className={cls(style.back, className)}>
      <IconButton name="ico-arrow-left" onClick={onClick} />
    </div>
  );
};

export default Back;
