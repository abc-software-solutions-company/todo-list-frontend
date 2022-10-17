import {useRouter} from 'next/router';
import {useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import FloatIcon from '@/core-ui/float-icon';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import {IList} from '@/data/api/types/list.type';

import ModalCreateUpdateList from '../modal-create-update-list';
import ModalDeleteList from '../modal-delete-list';
import ModalShare from '../modal-share';
import MyListTitle from '../my-list-title';
import useList from './hook';
import styles from './style.module.scss';

export default function MyList() {
  const [createUpdateModel, setCreateUpdateModel] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [selectedList, setSelectedList] = useState<IList>();
  const router = useRouter();
  const {todoList} = useList();

  const onCreateUpdate = (list?: IList) => {
    setSelectedList(list);
    setCreateUpdateModel(true);
  };
  const onDelete = (list: IList) => {
    setSelectedList(list);
    setDeleteModal(true);
  };
  const onShare = (list: IList) => {
    setSelectedList(list);
    setShareModal(true);
  };

  return (
    <>
      <div className={styles['page-list']}>
        <div className="container">
          <div className="toolbar">
            <div className="left">
              <MyListTitle />
            </div>
            <div className="right">
              <Button className="btn-create-new" startIcon={<Icon name="ico-plus-circle" size={28} />} onClick={() => onCreateUpdate()}>
                <span className="h5 font-medium">New List</span>
              </Button>
            </div>
          </div>
          <div className="list">
            {!todoList.length && <span className="empty">Empty list</span>}
            {todoList.map(list => (
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
        <ModalCreateUpdateList modalOpen={createUpdateModel} setModalOpen={setCreateUpdateModel} data={selectedList} />
        {selectedList && (
          <>
            <ModalDeleteList modalOpen={deleteModal} setModalOpen={setDeleteModal} data={selectedList} />
            <ModalShare modalOpen={shareModal} setModalOpen={setShareModal} id={selectedList.id} />
          </>
        )}
      </div>
    </>
  );
}
