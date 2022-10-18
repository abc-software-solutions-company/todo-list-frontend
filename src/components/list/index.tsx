import {useRouter} from 'next/router';
import {useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import FloatIcon from '@/core-ui/float-icon';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import {IListResponse} from '@/data/api/types/list.type';

import ModalCreateUpdateList from '../modal/modal-create-update-list';
import ModalDelete from '../modal/modal-delete';
import ModalShareList from '../modal/modal-share-list';
import useList from './hook';
import ListTitle from './list-title';
import styles from './style.module.scss';

export default function List() {
  const [createUpdateModel, setCreateUpdateModel] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [selectedList, setSelectedList] = useState<IListResponse>();
  const router = useRouter();
  const {allListbyUser, updateAllListbyUser} = useList();

  const onCreateUpdate = (list?: IListResponse) => {
    setSelectedList(list);
    setCreateUpdateModel(true);
  };
  const onDelete = (list: IListResponse) => {
    setSelectedList(list);
    setDeleteModal(true);
  };
  const onShare = (list: IListResponse) => {
    setSelectedList(list);
    setShareModal(true);
  };
  const onClose = () => {
    if (createUpdateModel) setCreateUpdateModel(false);
    if (deleteModal) setDeleteModal(false);
    if (shareModal) setShareModal(false);
  };

  return (
    <>
      <div className={styles['page-list']}>
        <div className="container">
          <div className="toolbar">
            <div className="left">
              <ListTitle />
            </div>
            <div className="right">
              <Button className="btn-create-new" startIcon={<Icon name="ico-plus-circle" size={28} />} onClick={() => onCreateUpdate()}>
                <span className="h5 font-medium">New List</span>
              </Button>
            </div>
          </div>
          <div className="list">
            {!allListbyUser.length && <span className="empty">Empty list</span>}
            {allListbyUser.map(list => (
              <div className="item" key={list.id}>
                <p className="title" onClick={() => router.push(`${ROUTES.LIST}/${list.id}`)}>
                  {list.name}
                </p>
                <div className="actions">
                  <IconButton name="ico-edit" onClick={() => onCreateUpdate(list)} />
                  <IconButton name="ico-trash-2" onClick={() => onDelete(list)} />
                  <IconButton name="ico-share-2 " onClick={() => onShare(list)} />
                  <IconButton name="ico-chevron-right" onClick={() => router.push(`${ROUTES.LIST}/${list.id}`)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <FloatIcon className="float-icon" onClick={() => onCreateUpdate()} />
        <ModalCreateUpdateList open={createUpdateModel} onClose={onClose} data={selectedList} onSuccess={updateAllListbyUser} />
        {selectedList && (
          <>
            <ModalDelete open={deleteModal} onClose={onClose} data={selectedList} onSuccess={updateAllListbyUser} />
            <ModalShareList open={shareModal} onClose={onClose} data={selectedList} />
          </>
        )}
      </div>
    </>
  );
}
