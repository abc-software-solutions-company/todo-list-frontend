import {FC} from 'react';

import api from '@/data/api';

import Assigned from './assigned';
import AssignedMyself from './assigned-myself';
import DeletedTask from './deleted-task';
import Invited from './invited';
import Priority from './priority';
import Status from './status';
import {Type, TypeNotifications} from './types';
import Unassigned from './unassigned';
import UnassignedMyself from './unassigned-myself';

const TypeNotifcations: FC<TypeNotifications> = props => {
  const {notification} = props;

  const handleIsRead = (id: string) => {
    api.notification.update(id);
  };

  let typeConponent = null;

  switch (notification.type) {
    case Type.ASSIGNED:
      typeConponent = <Assigned notification={notification} handleIsRead={() => handleIsRead(notification.id)} />;
      break;
    case Type.ASSIGNED_MYSELF:
      typeConponent = <AssignedMyself notification={notification} handleIsRead={() => handleIsRead(notification.id)} />;
      break;
    case Type.DELETED_TASK:
      typeConponent = <DeletedTask notification={notification} handleIsRead={() => handleIsRead(notification.id)} />;
      break;
    case Type.INVITED:
      typeConponent = <Invited notification={notification} handleIsRead={() => handleIsRead(notification.id)} />;
      break;
    case Type.PRIORITY:
      typeConponent = <Priority notification={notification} handleIsRead={() => handleIsRead(notification.id)} />;
      break;
    case Type.STATUS:
      typeConponent = <Status notification={notification} handleIsRead={() => handleIsRead(notification.id)} />;
      break;
    case Type.UNASSIGNED:
      typeConponent = <Unassigned notification={notification} handleIsRead={() => handleIsRead(notification.id)} />;
      break;
    case Type.UNASSIGNED_MYSELF:
      typeConponent = (
        <UnassignedMyself notification={notification} handleIsRead={() => handleIsRead(notification.id)} />
      );
      break;

    default:
      break;
  }

  return typeConponent;
};

export default TypeNotifcations;
