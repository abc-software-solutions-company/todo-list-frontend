'use client';
import Icon from '@/core-ui/icon';
import styles from './sidebar.module.scss';
import cls from 'classnames';
import { FC, MouseEventHandler } from 'react';

interface ISidebarBrand {
  active: boolean;
  showLess: () => void;
  showMore: () => void;
}

const SidebarBrand: FC<ISidebarBrand> = ({ active, showLess, showMore }) => {

  return (
    <div id="logo-section" className="flex items-center justify-between self-stretch">
      <div className={cls('flex items-center gap-3', {hidden: !active})}>
        <img src={'icons/logo.svg'} />
        <p className={'font-sans text-xl font-semibold leading-6 ' + styles.todoit}>ToDoIt</p>
      </div>
      <div id="options" className="flex items-center">
        <Icon name="ico-bell-notification" className={cls('gap-2 rounded-lg p-1', {hidden: !active})} />
        {active && <Icon name="ico-angles-left" onClick={showLess} className="gap-2 rounded-lg p-1" />}
        {!active && <Icon name="ico-angles-right" onClick={showMore} className="gap-2 rounded-lg p-1" />}
      </div>
    </div>
  );
};

export default SidebarBrand;