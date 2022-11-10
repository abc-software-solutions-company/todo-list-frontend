import {FC} from 'react';

import {getDate} from '@/utils/get-date';

import {IItemProps} from '..';

const Header: FC<IItemProps> = ({comment: {user, createdDate, updatedDate}}) => {
  const date = getDate(new Date(createdDate));

  const time = createdDate !== updatedDate ? date + ' (edited)' : date;

  return (
    <div className="user">
      <span>{user.name}</span>
      <div className="time">{time}</div>
    </div>
  );
};

export default Header;
