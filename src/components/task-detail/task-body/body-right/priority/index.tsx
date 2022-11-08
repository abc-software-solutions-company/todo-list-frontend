import classNames from 'classnames';
import {FC} from 'react';

import Title from '../../title';
import {IBodyRightProps} from '..';
import PrioritySelect from './priority-select';

export const Priority: FC<IBodyRightProps> = props => {
  const {className} = props;
  return (
    <div className={classNames('priority', className)}>
      <Title text="Priority" />
      <div className="select">
        <PrioritySelect {...props} />
      </div>
    </div>
  );
};
export default Priority;
