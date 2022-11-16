import classNames from 'classnames';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import useTodolist from '@/states/todolist/useTodolist';
import {MUI_ICON} from '@/utils/mui-icon';

import FavoriteButton from '../../common/favorite-button';
import style from './style.module.scss';
import Tool, {IToolProps} from './tool';
import ToolFilter from './tool-filter';
import ToolMenu from './tool-menu';

const ToolbarDetail: FC = () => {
  const {todolist, write, owner, setIsOpenModal, setSelectedTask, update} = useTodolist();

  const {name} = todolist;

  const onAddTask = () => {
    setSelectedTask();
    setIsOpenModal('task');
  };
  const onDelete = () => setIsOpenModal('delete');
  const onShare = () => setIsOpenModal('share');
  const onSetting = () => setIsOpenModal('settings');

  const deleteToolProps: IToolProps = {
    icon: <Icon name="ico-trash-2" />,
    text: 'Delete',
    hidden: !owner,
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
    hidden: !write,
    onClick: onAddTask
  };
  const settingToolProps: IToolProps = {
    icon: <Icon name="ico-settings" />,
    text: 'Settings',
    hidden: !write,
    onClick: onSetting
  };

  const toolMenuItems = [deleteToolProps, shareToolProps, addTaskToolProps, settingToolProps]
    .filter(item => !item.hidden)
    .map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

  return (
    <div className={style.toolbar}>
      <div className={classNames(style.tools, style.left)}>
        <div className={style.title}>{name}</div>
        <FavoriteButton onSuccess={update} todolist={todolist} />
      </div>
      <div className={classNames(style.tools, style.right)}>
        <Tool {...addTaskToolProps} className={style['tool-outer']} />
        <Tool {...deleteToolProps} className={style['tool-outer']} />
        <Tool {...shareToolProps} className={style['tool-outer']} />
        <ToolFilter />
        <Tool {...settingToolProps} className={style['tool-outer']} />
        <ToolMenu className="sm:hidden" items={toolMenuItems} icon={<MUI_ICON.MENU />} />
      </div>
    </div>
  );
};
export default ToolbarDetail;
