import cls from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/contexts/auth/context';
import Icon from '@/core-ui/icon';

import Back from '../back';
import ModalSocial from '../modal-social';
import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = ({className}) => {
  const router = useRouter();
  const auth = useStateAuth();
  const [socialOpen, setSocialOpen] = useState(false);
  const handleSocial = () => {
    setSocialOpen(true);
  };
  const currentPage = router.pathname;

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
  console.log(auth?.email);

  return (
    <div className={cls(styles.topbar, className)}>
      {auth?.userName && (
        <div className="container">
          <Back visibleOn={['/list', '/list/[id]']} currentPage={currentPage} onClick={() => returnTo(currentPage)} />
          <div className="authenticated">
            <Icon name="ico-user" />
            <span className="h2">{auth && auth.userName}</span>
            {auth?.email == null && (
              <span className="text-base2 ml-1 cursor-pointer text-red-500" onClick={() => handleSocial()}>
                (Unverified)
              </span>
            )}

            <span className="sep"></span>
            <Link href={ROUTES.LIST}>
              <a className="h2 text">My List</a>
            </Link>
          </div>
        </div>
      )}
      <ModalSocial open={socialOpen} onClose={() => setSocialOpen(false)} />
    </div>
  );
};

export default Topbar;
