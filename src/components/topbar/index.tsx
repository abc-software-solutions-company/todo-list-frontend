import cls from 'classnames';
import Link from 'next/link';
import {FC} from 'react';

import ModalThirdPartyLogin from '@/components/modal/modal-third-party-login';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';

import Back from '../common/back';
import useTopbar from './hook';
import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = ({className}) => {
  const {auth, currentPage, handleSocial, returnTo, socialOpen, router, setSocialOpen} = useTopbar();

  return (
    <div className={cls(styles.topbar, className)}>
      {auth?.name && (
        <div className="container">
          <div className="inner">
            <Back
              visibleOn={[`${ROUTES.LIST}`, `${ROUTES.LIST}/[id]`, `${ROUTES.TASK}`, `${ROUTES.TASK}/[id]`]}
              currentPage={currentPage}
              onClick={() => returnTo(currentPage)}
            />
            <div className="authenticated">
              <Link href={ROUTES.TASK}>
                <a className="h2 text">My Tasks</a>
              </Link>
              <span className="sep"></span>
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
                    router.push(ROUTES.LOGIN);
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
