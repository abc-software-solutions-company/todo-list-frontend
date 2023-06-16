import {useRouter} from 'next/router';
import {FC} from 'react';

import TodolistFavorite from '@/components/common/todolist-favorite';
import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useLists from '@/states/lists/use-lists';
import useModals from '@/states/modals/use-modals';
import {MUI_ICON} from '@/utils/mui-icon';

interface IItemProps {
  todolist: ITodolistResponse;
  hiddenFavorite?: boolean;
  hiddenEdit?: boolean;
  hiddenDelete?: boolean;
  hiddenShare?: boolean;
  hiddenOpenDocument?: boolean;
}

const Item: FC<IItemProps> = ({todolist, ...props}) => {
  const {id, name, favorite} = todolist;
  const {hiddenDelete, hiddenEdit, hiddenFavorite, hiddenShare, hiddenOpenDocument} = props;
  const router = useRouter();

  const {get: onSuccess} = useLists();
  const {setIsOpenModal, setSelectedTodolist} = useModals();

  const onEdit = () => {
    setIsOpenModal('settings');
    setSelectedTodolist(todolist);
  };

  const onDelete = () => {
    setIsOpenModal('deleteList');
    setSelectedTodolist(todolist);
  };

  const onShare = () => {
    setIsOpenModal('shareList');
    setSelectedTodolist(todolist);
  };

  const onOpenDocumentation = () => {
    router.push(`${ROUTES.DOCUMENT}/${id}`);
  };

  const onDetail = (todolistId: string) => router.push(`${ROUTES.LIST}/${todolistId}`);

  const editToolProps: IToolProps = {
    icon: <Icon name="ico-edit" />,
    text: 'Edit',
    onClick: onEdit,
    hidden: hiddenEdit
  };

  const deleteToolProps: IToolProps = {
    icon: <Icon name="ico-trash-2" />,
    text: 'Delete',
    onClick: onDelete,
    hidden: hiddenDelete
  };

  const shareToolProps: IToolProps = {
    icon: <Icon name="ico-share-2" />,
    text: 'Share',
    onClick: onShare,
    hidden: hiddenShare
  };

  const openDocumentationProps: IToolProps = {
    icon: <Icon name="ico-notebook" />,
    text: 'Open Documentation',
    onClick: onOpenDocumentation,
    hidden: hiddenOpenDocument
  };

  const tools = [editToolProps, deleteToolProps, shareToolProps, openDocumentationProps].filter(item => !item.hidden);

  const toolMenuItems = tools.map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

  return (
    <div className="item">
      <p className="title" onClick={() => onDetail(id)}>
        {name}
      </p>
      <div className="actions">
        {!hiddenFavorite && <TodolistFavorite id={id} favorite={favorite} onSuccess={onSuccess} />}
        {tools.map((e, index) => (
          <Tool key={index} icon={e.icon} onClick={e.onClick} className="hidden sm:block" />
        ))}
        <ToolMenu icon={<MUI_ICON.MORE_VERT />} items={toolMenuItems} margin={-1} />
      </div>
    </div>
  );
};

export default Item;
