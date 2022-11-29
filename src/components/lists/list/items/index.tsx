import {useRouter} from 'next/router';
import {FC} from 'react';

import TodolistFavorite from '@/components/common/todolist-favorite';
import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useLists from '@/states/lists/use-lists';
import {MUI_ICON} from '@/utils/mui-icon';

interface IItemProps {
  todolist: ITodolistResponse;
}

const Item: FC<IItemProps> = ({todolist}) => {
  const {id, name, favorite} = todolist;
  const router = useRouter();

  const {setSelectedTodolist, setIsOpenModal, get: onSuccess} = useLists();

  const onEdit = () => {
    setIsOpenModal('edit');
    setSelectedTodolist(todolist);
  };

  const onDelete = () => {
    setIsOpenModal('delete');
    setSelectedTodolist(todolist);
  };

  const onShare = () => {
    setIsOpenModal('share');
    setSelectedTodolist(todolist);
  };

  const onDetail = (todolistId: string) => router.push(`${ROUTES.LIST}/${todolistId}`);

  const editToolProps: IToolProps = {
    icon: <Icon name="ico-edit" />,
    text: 'Edit',
    onClick: onEdit
  };

  const deleteToolProps: IToolProps = {
    icon: <Icon name="ico-trash-2" />,
    text: 'Delete',
    onClick: onDelete
  };

  const shareToolProps: IToolProps = {
    icon: <Icon name="ico-share-2" />,
    text: 'Share',
    onClick: onShare
  };
  const tools = [editToolProps, deleteToolProps, shareToolProps];

  const toolMenuItems = tools.filter(item => !item.hidden).map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

  return (
    <div className="item">
      <p className="title" onClick={() => onDetail(id)}>
        {name}
      </p>
      <div className="actions">
        <TodolistFavorite id={id} favorite={favorite} onSuccess={onSuccess} />
        {tools.map((e, index) => (
          <Tool key={index} icon={e.icon} onClick={e.onClick} className="hidden sm:block" />
        ))}
        <ToolMenu icon={<MUI_ICON.MORE_VERT />} items={toolMenuItems} margin={-1} />
      </div>
    </div>
  );
};

export default Item;
