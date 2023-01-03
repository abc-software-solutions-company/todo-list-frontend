import {useRouter} from 'next/router';
import {FC} from 'react';

import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import Notification from '@/components/notification';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';
import {MUI_ICON} from '@/utils/mui-icon';

import TopBarAccount from './account';
import TopBarShare from './share';
import style from './style.module.scss';

const TopAreaRight: FC = () => {
  const {boardData} = useBoards();
  const {todolist} = useTodolist();
  const router = useRouter();
  const {setSelectedTodolist, setIsOpenModal} = useModals();

  const onShare = () => {
    if (router.asPath.includes(`${ROUTES.LIST}`)) setSelectedTodolist(todolist);
    if (router.asPath.includes(`${ROUTES.KANBAN}`)) setSelectedTodolist(boardData);
    setIsOpenModal('shareList');
  };

  const topBarShareProps: IToolProps = {
    icon: <Icon name="ico-share-3" />,
    text: 'Share',
    onClick: onShare
  };

  const toolMenuMobileItems = [topBarShareProps].map((item, idx) => (
    <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />
  ));
  return (
    <div className={style['top-area-right']}>
      <TopBarShare onShare={onShare} />
      <div className="notification">
        <Notification />
      </div>
      <TopBarAccount />
      <ToolMenu display="alway" className="md:hidden" items={toolMenuMobileItems} icon={<MUI_ICON.MENU />} />
    </div>
  );
};
export default TopAreaRight;
