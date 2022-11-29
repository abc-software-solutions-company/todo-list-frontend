import classNames from 'classnames';
import {FC, ReactNode} from 'react';

import Button from '@/core-ui/button';

import style from './style.module.scss';

export interface IToolProps {
  className?: string;
  icon: ReactNode;
  text?: string;
  hidden?: boolean;
  onClick?: () => void;
}

const Tool: FC<IToolProps> = ({className, icon, text, hidden, onClick}) => {
  if (hidden) return null;
  return (
    <Button onClick={onClick} className={classNames(className, style.tool)}>
      {icon}
      {text && <span>{text}</span>}
    </Button>
  );
};
export default Tool;
