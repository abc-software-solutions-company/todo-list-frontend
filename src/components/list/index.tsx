import {useRouter} from 'next/router';
import {useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import FloatIcon from '@/core-ui/float-icon';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {MUI_ICON} from '@/utils/mui-icon';

import FavoriteButton from '../common/favorite-button';
import Tool, {IToolProps} from '../list-detail/toolbar/tool';
import ToolMenu from '../list-detail/toolbar/tool-menu';
import ModalCreateUpdateList from '../modal/modal-create-update-list';
import ModalDelete from '../modal/modal-delete';
import ModalShare from '../modal/modal-share';
import useList from './hook';
import ListTitle from './list-title';
import styles from './style.module.scss';

export default function List() {
  const router = useRouter();
  const [createUpdateModel, setCreateUpdateModel] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [selectedList, setSelectedList] = useState<ITodolistResponse>();
  const {yourList, updateYourList, favoriteList, updateFavoriteList} = useList();

  const onDetail = (todolistId: string) => router.push(`${ROUTES.LIST}/${todolistId}`);
  const onCreateUpdate = (list?: ITodolistResponse) => {
    setSelectedList(list);
    setCreateUpdateModel(true);
  };
  const onDelete = (list: ITodolistResponse) => {
    setSelectedList(list);
    setDeleteModal(true);
  };
  const onShare = (list: ITodolistResponse) => {
    setSelectedList(list);
    setShareModal(true);
  };
  const onClose = () => {
    if (createUpdateModel) setCreateUpdateModel(false);
    if (deleteModal) setDeleteModal(false);
    if (shareModal) setShareModal(false);
  };
  const onSuccessFavorite = () => {
    updateYourList();
    updateFavoriteList();
  };

  const toolMenuMobile = (list: ITodolistResponse) => {
    const editToolProps: IToolProps = {
      icon: <Icon name="ico-edit" />,
      text: 'Edit',
      onClick: () => onCreateUpdate(list)
    };

    const deleteToolProps: IToolProps = {
      icon: <Icon name="ico-trash-2" />,
      text: 'Delete',
      onClick: () => onDelete(list)
    };

    const shareToolProps: IToolProps = {
      icon: <Icon name="ico-share-2" />,
      text: 'Share',
      onClick: () => onDelete(list)
    };

    const toolMenuItems = [editToolProps, deleteToolProps, shareToolProps]
      .filter(item => !item.hidden)
      .map((item, idx) => <Tool key={idx} {...{...item, className: 'flex-row-reverse'}} />);

    return toolMenuItems;
  };

  return (
    <>
      <div className={styles['page-list']}>
        <div className="container">
          <div className="my-list">
            <div className="toolbar">
              <div className="left">
                <ListTitle tilte="MY LIST" />
              </div>
              <div className="right">
                <Button className="btn-create-new" startIcon={<Icon name="ico-plus-circle" size={28} />} onClick={() => onCreateUpdate()}>
                  <span className="h5 ml-1 font-medium">New List</span>
                </Button>
              </div>
            </div>
            <div className="list">
              {!yourList.length && <span className="empty">Empty list</span>}
              {yourList.map(todolist => {
                return (
                  <div className="item" key={todolist.id}>
                    <p className="title" onClick={() => onDetail(todolist.id)}>
                      {todolist.name}
                    </p>
                    <div className="actions">
                      <FavoriteButton todolist={todolist} onSuccess={onSuccessFavorite} />
                      <IconButton name="ico-edit" className="action-desktop" onClick={() => onCreateUpdate(todolist)} />
                      <IconButton name="ico-trash-2" className="action-desktop" onClick={() => onDelete(todolist)} />
                      <IconButton name="ico-share-2 " className="action-desktop" onClick={() => onShare(todolist)} />
                      <Button className="w-3" onClick={() => onDetail(todolist.id)}>
                        <Icon name="ico-chevron-right" />
                      </Button>
                      <ToolMenu icon={<MUI_ICON.MORE_VERT />} items={toolMenuMobile(todolist)} margin={-1} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="favorite-list">
            <div className="toolbar">
              <div className="left">
                <ListTitle tilte="FAVORITE LIST" />
              </div>
            </div>
            <div className="list">
              {!favoriteList.length && <span className="empty">Empty list</span>}
              {favoriteList.map(todolist => {
                return (
                  <div className="item" key={todolist.id}>
                    <p className="title" onClick={() => onDetail(todolist.id)}>
                      {todolist.name}
                    </p>
                    <div className="actions">
                      <FavoriteButton todolist={todolist} onSuccess={onSuccessFavorite} />
                      <IconButton name="ico-edit" className="action-desktop" onClick={() => onCreateUpdate(todolist)} />
                      <IconButton name="ico-trash-2" className="action-desktop" onClick={() => onDelete(todolist)} />
                      <IconButton name="ico-share-2 " className="action-desktop" onClick={() => onShare(todolist)} />
                      <Button className="w-3" onClick={() => onDetail(todolist.id)}>
                        <Icon name="ico-chevron-right" />
                      </Button>
                      <ToolMenu icon={<MUI_ICON.MORE_VERT />} items={toolMenuMobile(todolist)} margin={-1} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <FloatIcon className="float-icon" onClick={() => onCreateUpdate()} />
        <ModalCreateUpdateList open={createUpdateModel} onClose={onClose} data={selectedList} onSuccess={updateYourList} />
        {selectedList && (
          <>
            <ModalDelete open={deleteModal} onClose={onClose} data={selectedList} onSuccess={updateYourList} />
            <ModalShare open={shareModal} onClose={onClose} data={selectedList} />
          </>
        )}
      </div>
    </>
  );
}
