import {FC, useEffect} from 'react';

import FloatIcon from '@/core-ui/float-icon';
import useLists from '@/states/lists/use-lists';

import ModalCreateUpdateList from '../modal/modal-create-update-list';
import ModalDelete from '../modal/modal-delete';
import ModalShare from '../modal/modal-share';
import List from './list';
import styles from './style.module.scss';
import Toolbar from './toolbar';

const Lists: FC = () => {
  const {myList, favoriteList, isOpenModal, selectedTodolist, get, setIsOpenModal, setSelectedTodolist} = useLists();

  const onNew = () => {
    setIsOpenModal('edit');
    setSelectedTodolist();
  };

  const onClose = () => setIsOpenModal(null);

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['page-list']}>
      <div className="container">
        <Toolbar title="My List" showActions={true} />
        <List list={myList} />
        <Toolbar title="Favorite List" className="mt-8" />
        <div className="favorite-list">
          <List list={favoriteList} />
        </div>
      </div>
      <FloatIcon className="float-icon" onClick={onNew} />
      <ModalCreateUpdateList open={isOpenModal.edit} onClose={onClose} data={selectedTodolist} onSuccess={get} />
      {selectedTodolist && (
        <>
          <ModalDelete open={isOpenModal.delete} onClose={onClose} data={selectedTodolist} onSuccess={get} />
          <ModalShare open={isOpenModal.share} onClose={onClose} data={selectedTodolist} />
        </>
      )}
    </div>
  );
};
export default Lists;
