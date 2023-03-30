import {useRouter} from 'next/router';
import {FC} from 'react';

import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import Notification from '@/components/notification';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';
import {MUI_ICON} from '@/utils/mui-icon';

import TopBarAccount from './account';
import TopBarShare from './share';
import style from './style.module.scss';

const TopAreaRight: FC = () => {
  const {boardData} = useBoards();
  const {data: todolist} = useTodolist();

  const router = useRouter();
  const path = router.asPath;
  const {id} = router.query;

  const {setSelectedTodolist, setIsOpenModal} = useModals();

  const onShare = () => {
    if (isListDetailPage(path, id as string)) setSelectedTodolist(todolist);
    if (isBoardPage(path, id as string)) setSelectedTodolist(boardData);
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
      {(isBoardPage(path, id as string) || isListDetailPage(path, id as string)) && <TopBarShare onShare={onShare} />}
      <div className="notification">
        <Notification />
      </div>
      <TopBarAccount />
      <ToolMenu display="alway" className="md:hidden" items={toolMenuMobileItems} icon={<MUI_ICON.MENU />} />
    </div>
  );
};
export default TopAreaRight;
