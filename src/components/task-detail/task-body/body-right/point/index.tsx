import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

import Input from '@/core-ui/input';

import Title from '../../title';

export const Point: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  return (
    <div className={classNames('point', className)}>
      <Title text="Point" />
      <Input name="point-num" placeholder="Coming soon" />
    </div>
  );
};
export default Point;
