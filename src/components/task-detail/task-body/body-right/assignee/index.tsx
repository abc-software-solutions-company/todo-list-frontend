import classNames from 'classnames';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import {IBaseProps} from '@/types';

import Title from '../../title';

const Assignee: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames('assignee', className)}>
      <Title text="Assignee" />
      <div className="user">
        <Icon name="ico-user" />
        <p>Coming soon</p>
      </div>
    </div>
  );
};
export default Assignee;
