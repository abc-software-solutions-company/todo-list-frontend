import {useRouter} from 'next/router';
import {useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import FloatIcon from '@/core-ui/float-icon';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import {ITodolistResponse} from '@/data/api/types/list.type';

import FavoriteButton from '../common/favorite-button';
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
                      <IconButton name="ico-edit" onClick={() => onCreateUpdate(todolist)} />
                      <IconButton name="ico-trash-2" onClick={() => onDelete(todolist)} />
                      <IconButton name="ico-share-2 " onClick={() => onShare(todolist)} />
                      <IconButton name="ico-chevron-right" onClick={() => onDetail(todolist.id)} />
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
                      <IconButton name="ico-edit" onClick={() => onCreateUpdate(todolist)} />
                      <IconButton name="ico-trash-2" onClick={() => onDelete(todolist)} />
                      <IconButton name="ico-share-2 " onClick={() => onShare(todolist)} />
                      <IconButton name="ico-chevron-right" onClick={() => onDetail(todolist.id)} />
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
