import classNames from 'classnames';
import {FC} from 'react';

import Input from '@/core-ui/input';
import {IBaseProps} from '@/types';

import Title from '../../title';

export const Point: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames('point', className)}>
      <Title text="Point" />
      <Input name="point-num" placeholder="Coming soon" />
    </div>
  );
};
export default Point;
