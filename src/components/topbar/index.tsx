import cls from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC} from 'react';

import useTask from '@/states/task/use-task';

import Back from '../common/back';
import TopAreaRight from '../topbar-new/top-area/right';
import useTopbar from './hook';
import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = ({className}) => {
  const router = useRouter();
  const {task} = useTask();
  const {auth, currentPage, returnTo, ROUTES} = useTopbar();

  const isKanban = () => {
    if (router.asPath.includes(ROUTES.KANBAN)) return true;
    return false;
  };

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
                <Back
                  visibleOn={[
                    `${ROUTES.LIST}`,
                    `${ROUTES.LIST}/[id]`,
                    `${ROUTES.TASK}`,
                    `${ROUTES.TASK}/[id]`,
                    `${ROUTES.KANBAN}/[id]`
                  ]}
                  currentPage={currentPage}
                  onClick={() => returnTo(currentPage)}
                />
                <Link href={`${ROUTES.LIST}/${task?.todolist?.id}`} className="hover:no-underline">
                  <span className="ml-2 cursor-pointer text-base font-semibold text-slate-700  md:text-h4">
                    {task?.todolist?.name}
                  </span>
                </Link>
              </div>
            )}
            <TopAreaRight />
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
