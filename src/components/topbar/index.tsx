import cls from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import ModalThirdPartyLogin from '@/components/modal/modal-third-party-login';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {FireAuthUtils} from '@/lib/firebase/fireAuth-utils';
import {useStateAuth} from '@/states/auth/context';
import LocalStorage from '@/utils/local-storage';

import Back from '../common/back';
import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const fireAuthUtils = new FireAuthUtils();

const Topbar: FC<IProps> = ({className}) => {
  const router = useRouter();

  const auth = useStateAuth();

  const [socialOpen, setSocialOpen] = useState(false);
  const handleSocial = () => setSocialOpen(true);
  const currentPage = router.pathname;

  const returnTo = (curPage: string) => {
    switch (curPage) {
      case '/list':
        router.push(ROUTES.HOME);
        break;
      case '/list/[id]':
        router.push(ROUTES.LIST);
        break;
      case '/tasks/[id]':
        router.push(ROUTES.LIST + '/' + LocalStorage.listId.get());
        break;
    }
  };

  return (
    <div className={cls(styles.topbar, className)}>
      {auth?.name && (
        <div className="container">
          <div className="inner">
            <Back visibleOn={['/list', '/list/[id]', '/tasks/[id]']} currentPage={currentPage} onClick={() => returnTo(currentPage)} />
            <div className="authenticated">
              <Link href={ROUTES.LIST}>
                <a className="h2 text">My Lists</a>
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
          </div>
        </div>
      )}
      <ModalThirdPartyLogin open={socialOpen} onClose={() => setSocialOpen(false)} />
    </div>
  );
};

export default Topbar;
