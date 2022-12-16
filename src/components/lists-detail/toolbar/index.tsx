import classNames from 'classnames';
import {FC} from 'react';

import InputAutosize from '@/components/common/input-autosize';
import Icon from '@/core-ui/icon';
import api from '@/data/api';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';
import {MUI_ICON} from '@/utils/mui-icon';

import TodolistFavorite from '../../common/todolist-favorite';
import ToolFilter from '../../common/tool-filter';
import style from './style.module.scss';
import Tool, {IToolProps} from './tool';
import ToolMenu from './tool-menu';

const ToolbarDetail: FC = () => {
  const {todolist, write, owner} = useTodolist();
  const {setIsOpenModal, setSelectedTask, setSelectedTodolist} = useModals();

  const {id, name, favorite} = todolist;

  const handleSave = (value: string) => {
    api.todolist.update({id, name: value});
  };

  const onAddTask = () => {
    setSelectedTask();
    setSelectedTodolist(todolist);
    setIsOpenModal('createTask');
  };
  const onDelete = () => {
    setSelectedTodolist(todolist);
    setIsOpenModal('deleteList');
  };
  const onShare = () => {
    setSelectedTodolist(todolist);
    setIsOpenModal('shareList');
  };
  const onSetting = () => {
    setSelectedTodolist(todolist);
    setIsOpenModal('settings');
  };
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
        <TodolistFavorite id={id} favorite={favorite} />
        <InputAutosize value={name} handleSave={handleSave} role="title" write={write} />
      </div>
      <div className={classNames(style.tools, style.right)}>
        <Tool {...addTaskToolProps} className={style['tool-outer']} />
        <Tool {...deleteToolProps} className={style['tool-outer']} />
        <Tool {...shareToolProps} className={style['tool-outer']} />
        <ToolFilter todolist={todolist} />
        <Tool {...settingToolProps} className={style['tool-outer']} />

        <ToolMenu className="sm:hidden" items={toolMenuItems} icon={<MUI_ICON.MENU />} />
      </div>
    </div>
  );
};
export default ToolbarDetail;
