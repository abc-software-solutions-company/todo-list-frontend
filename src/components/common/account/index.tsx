import cls from 'classnames';
import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {IUserResponse} from '@/data/api/types/user.type';
import useModals from '@/states/modals/use-modals';

import AssigneeIcon from '../assignee-icon';
import style from './style.module.scss';

interface IAccountProps {
  user?: IUserResponse;
  handleClosePopover?: () => void;
}

const Account: FC<IAccountProps> = props => {
  const {user, handleClosePopover} = props;
  const router = useRouter();
  const {setIsOpenModal} = useModals();

  const onUpdate = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    handleClosePopover && handleClosePopover();
    setIsOpenModal('updateUser');
  };

  return (
    <>
      {user && (
        <>
          <div className={cls(style.account)}>
            <div className="wrapper">
              <div className="relative">
                <p className="title bland">My Account</p>
                <Icon className="cursor-pointer" name="ico-x" size={24} onClick={handleClosePopover} />
              </div>
              <hr className="pb-3" />
              <div className="info">
                <div className="left">
                  <AssigneeIcon name={user.name} onClick={onUpdate} bg="bg-sky-500" />
                </div>
                <div className="right">
                  <div className="flex w-40 items-center gap-x-1">
                    <p className="name">{user.name}</p>
                    <Icon className="cursor-pointer" name="ico-pen-edit" size={12} onClick={onUpdate} />
                  </div>
                  <p className="email bland">{user.email}</p>
                </div>
              </div>
              <div className="action">
                {/* <p className="cursor-pointer">Change Account</p> */}
                <p
                  className="logout"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    handleClosePopover && handleClosePopover();
                    router.push(ROUTES.LOGIN);
                  }}
                >
                  Log Out
                </p>
              </div>
              <hr className="pb-4" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
