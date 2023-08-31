import {Popover} from '@mui/material';
import {FC, useState} from 'react';

import Account from '@/components/common/account';
import AssigneeIcon from '@/components/common/assignee-icon';
import ModalThirdPartyLogin from '@/components/modals/modal-third-party-login';
import {useStateAuth} from '@/states/auth';

import style from './style.module.scss';

const TopBarAccount: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [socialOpen, setSocialOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSocial = () => setSocialOpen(true);

  const open = Boolean(anchorEl);

  const auth = useStateAuth();
  return (
    <>
      <div className={style['topbar-account']}>
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
      <ModalThirdPartyLogin open={socialOpen} onClose={() => setSocialOpen(false)} />
    </>
  );
};

export default TopBarAccount;
