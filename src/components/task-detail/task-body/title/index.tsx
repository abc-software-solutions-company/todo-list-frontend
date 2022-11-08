import classNames from 'classnames';
import {FC, ReactNode} from 'react';

interface Iprops {
  className?: string;
  icon?: ReactNode;
  text?: string;
  rightBtn?: ReactNode;
}
const Title: FC<Iprops> = ({className, icon, text, rightBtn}) => {
  return (
    <div className={classNames('title', className)}>
      {icon}
      <span className="text">{text}</span>
      {rightBtn}
    </div>
  );
};
export default Title;
