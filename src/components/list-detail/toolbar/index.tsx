import classNames from 'classnames';

import Icon from '@/core-ui/icon';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {useStateAuth} from '@/states/auth';
import {MUI_ICON} from '@/utils/mui-icon';

import FavoriteButton from '../../common/favorite-button';
import style from './style.module.scss';
import Tool, {IToolProps} from './tool';
import ToolFilter from './tool-filter';
import ToolMenu from './tool-menu';

interface IProp {
  todolist: ITodolistResponse;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onAddTask: () => void;
  filterValue: number;
  onFilter: (value: number) => void;
  onSuccessFavorite: () => void;
}

export default function ToolbarDetail({todolist, filterValue, onEdit, onDelete, onShare, onAddTask, onFilter, onSuccessFavorite}: IProp) {
  const {name, status, visibility, userId} = todolist;
  const filterList = status.sort((a, b) => a.index - b.index);
  const auth = useStateAuth();
  const isInteractive = visibility === 'PUBLIC' || auth?.id === userId;
  const isListOwner = () => {
    if (visibility === 'READ_ONLY' && auth?.id === userId) return true;
    if (visibility === 'PUBLIC' && auth?.id === userId) return true;
    return false;
  };

  const deleteToolProps: IToolProps = {
    icon: <Icon name="ico-trash-2" />,
    text: 'Delete',
    hidden: !isListOwner(),
    onClick: onDelete
  };
  const shareToolProps: IToolProps = {
    icon: <Icon name="ico-share-3" />,
    text: 'Share',
    onClick: onShare
  };
  const addTaskToolProps: IToolProps = {
    icon: <Icon name="ico-plus-circle" />,
    text: 'Add Task',
    hidden: !isInteractive,
    onClick: onAddTask
  };
  const settingToolProps: IToolProps = {
    icon: <Icon name="ico-settings" />,
    text: 'Settings',
    hidden: !isInteractive,
    onClick: onEdit
  };

  const toolMenuItems = [deleteToolProps, shareToolProps, addTaskToolProps, settingToolProps]
    .filter(item => !item.hidden)
    .map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

  return (
    <div className={style.toolbar}>
      <div className={classNames(style.tools, style.left)}>
        <div className={style.title}>{name}</div>
        <FavoriteButton onSuccess={onSuccessFavorite} todolist={todolist} />
      </div>
      <div className={classNames(style.tools, style.right)}>
        <Tool {...addTaskToolProps} className={style['tool-outer']} />
        <Tool {...deleteToolProps} className={style['tool-outer']} />
        <Tool {...shareToolProps} className={style['tool-outer']} />
        <ToolFilter {...{filterValue, filterList, onFilter}} />
        <Tool {...settingToolProps} className={style['tool-outer']} />
        <ToolMenu className="sm:hidden" items={toolMenuItems} icon={<MUI_ICON.MENU />} />
      </div>
    </div>
  );
}
