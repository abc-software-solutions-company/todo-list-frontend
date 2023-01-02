import {FC} from 'react';

import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';

import style from './style.module.scss';

const TopBarShare: FC = () => {
  const {boardData} = useBoards();
  const {setSelectedTodolist, setIsOpenModal} = useModals();
  const onShare = () => {
    setSelectedTodolist(boardData);
    setIsOpenModal('shareList');
  };
  return (
    <div className={style['topbar-share']} onClick={onShare}>
      <Icon name="Share" className="ico-share-3  text-white" />
      Share
    </div>
  );
};

export default TopBarShare;
