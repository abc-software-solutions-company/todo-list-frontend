import {Popover} from '@mui/material';
import cls from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import ModalThirdPartyLogin from '@/components/modal/modal-third-party-login';
import useTask from '@/states/task/use-task';

import Account from '../common/account';
import AssigneeIcon from '../common/assignee-icon';
import Back from '../common/back';
import Notification from '../notification';
import useTopbar from './hook';
import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = ({className}) => {
  const router = useRouter();
  const {task} = useTask();
  const {auth, currentPage, handleSocial, returnTo, socialOpen, setSocialOpen, ROUTES} = useTopbar();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isKanban = () => {
    if (router.asPath.includes(ROUTES.KANBAN)) return true;
    return false;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={cls(styles.topbar, className)}>
      {auth?.name && (
        <div className={`${isKanban() ? '' : 'container'} `}>
          <div className="inner">
            {(`${ROUTES.LIST}` ||
              `${ROUTES.LIST}/[id]` ||
              `${ROUTES.TASK}` ||
              `${ROUTES.TASK}/[id]` ||
              `${ROUTES.KANBAN}/[id]`) && (
              <div className="left-topbar flex w-full items-center">
                <Back currentPage={currentPage} onClick={() => returnTo(currentPage)} />
                <span className="h2 ml-2 ">{task.todolist.name}</span>
              </div>
            )}

            <div className="authenticated">
              <Link href={ROUTES.TASK}>
                <a className={`h2 text ${currentPage === ROUTES.TASK && 'active'}`}>My Tasks</a>
              </Link>
              <span className="sep"></span>
              <Link href={ROUTES.LIST}>
                <a className={`h2 text ${currentPage === ROUTES.LIST && 'active'}`}>My Lists</a>
              </Link>
              {/* Seperator line */}
              <span className="sep"></span>
              <Notification />
              <span className="sep-none"></span>
              <span className="h2">
                {auth && (
                  <>
                    <button onClick={handleClick}>
                      <AssigneeIcon name={auth.name} bg="bg-sky-500" />
                    </button>
                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      sx={{
                        maxWidth: 333,
                        left: 0,
                        top: 7,
                        zIndex: 50
                      }}
                    >
                      <Account user={auth} handleClosePopover={handleClose} />
                    </Popover>
                  </>
                )}
              </span>
              {auth?.email == null && (
                <span className="unverified" onClick={() => handleSocial()}>
                  (Unverified)
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <ModalThirdPartyLogin open={socialOpen} onClose={() => setSocialOpen(false)} />
    </div>
  );
};

export default Topbar;
