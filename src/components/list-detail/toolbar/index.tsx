import classNames from 'classnames';
import {FC} from 'react';

import InputAutosize from '@/components/common/input-autosize';
import Icon from '@/core-ui/icon';
import api from '@/data/api';
import useTodolist from '@/states/todolist/use-todolist';
import {MUI_ICON} from '@/utils/mui-icon';

import FavoriteButton from '../../common/favorite-button';
import style from './style.module.scss';
import Tool, {IToolProps} from './tool';
import ToolFilter from './tool-filter';
import ToolMenu from './tool-menu';

const ToolbarDetail: FC = () => {
  const {todolist, write, owner, setIsOpenModal, setSelectedTask, update} = useTodolist();

  const {id, name} = todolist;

  const handleSave = (value: string) => {
    api.todolist.update({id, name: value});
  };

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
        <FavoriteButton onSuccess={update} todolist={todolist} />
        <InputAutosize value={name} handleSave={handleSave} />
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
