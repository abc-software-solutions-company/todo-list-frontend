import cn from 'classnames';
import Link from 'next/link';

import Logo from '@/components/icons/logo';
import Hamburger from '@/components/menu/hanburger';
import MainNav from '@/components/menu/nav';

import styles from './style.module.scss';

interface IProps {
  className?: string;
  hamburgerActive?: boolean;
  onClick?: () => void;
}

const MenuDesktop: React.FC<IProps> = ({className, hamburgerActive, onClick}) => {
  return (
    <div className={cn(styles['menu-desktop'], className)}>
      <div className="container">
        <div className="inner">
          <Link href="/">
            <a className="logo-iki">
              <Logo width={100} />
              <h1>Software Solutions</h1>
            </a>
          </Link>
          <MainNav classname="ico-menu" />
          <Hamburger active={hamburgerActive} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default MenuDesktop;
