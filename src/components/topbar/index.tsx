import MenuIcon from '@mui/icons-material/Menu';
import {Button} from '@mui/material';
import cls from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ModalThirdPartyLogin from '@/components/modal/modal-third-party-login';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {FireAuthUtils} from '@/lib/firebase/fireAuth-utils';
import {useStateAuth} from '@/states/auth/context';
import {globalSlice, RootState} from '@/states/store';

import Back from '../common/back';
import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const fireAuthUtils = new FireAuthUtils();

const Topbar: FC<IProps> = ({className}) => {
  const router = useRouter();
  const auth = useStateAuth();
  const globalState = useSelector((state: RootState) => state.global);
  const anchorEl = globalState.anchorElToolBarMenu;
  const openMenu = Boolean(anchorEl);
  const [socialOpen, setSocialOpen] = useState(false);
  const handleSocial = () => setSocialOpen(true);
  const currentPage = router.pathname;
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(globalSlice.actions.setAnchorElToolBarMenu(event.currentTarget));
  };

  const returnTo = (curPage: string) => {
    switch (curPage) {
      case '/list':
        router.push(ROUTES.HOME);
        break;
      case '/list/[id]':
        router.push(ROUTES.LIST);
        break;
    }
  };
  const isDetailPage = router.asPath.includes(ROUTES.LIST + '/');

  return (
    <div className={cls(styles.topbar, className)}>
      {auth?.name && (
        <div className="container">
          <Back visibleOn={['/list', '/list/[id]']} currentPage={currentPage} onClick={() => returnTo(currentPage)} />
          <div className="authenticated">
            <Link href={ROUTES.LIST}>
              <a className="h2 text">My List</a>
            </Link>
            {/* Seperator line */}
            <span className="sep"></span>
            <span className="h2">
              <Icon name="ico-user" />
              {auth && auth.name}
            </span>
            {auth?.email == null ? (
              <span className="unverified" onClick={() => handleSocial()}>
                (Unverified)
              </span>
            ) : (
              <span
                className="logout"
                onClick={() => {
                  fireAuthUtils.signOutOfGoogle();
                  router.reload();
                }}
              >
                <span className="h2">
                  <Icon name="ico-logout" />
                </span>
              </span>
            )}
          </div>
          {isDetailPage && (
            <Button
              id="ToolBarMenu-button"
              aria-controls={openMenu ? 'ToolBarMenu-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClick}
              sx={{padding: 0, margin: 0, minWidth: 32}}
            >
              <MenuIcon />
            </Button>
          )}
        </div>
      )}
      <ModalThirdPartyLogin open={socialOpen} onClose={() => setSocialOpen(false)} />
    </div>
  );
};

export default Topbar;
