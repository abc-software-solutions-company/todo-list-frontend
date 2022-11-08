import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

import Icon from '@/core-ui/icon';

import Title from '../../title';

const Assignee: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
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
