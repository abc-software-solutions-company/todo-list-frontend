import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API, {ITodoList} from '@/api/network/todo-list';
import ModalCreateList from '@/components/modal-create-list';
import ModalShare from '@/components/modal-share';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import IconButton from '@/core-ui/ico-button';
import Icon from '@/core-ui/icon';

import styles from './style.module.scss';

const List: React.FC = () => {
  const router = useRouter();
  // Check local storage.
  useEffect(() => {
    const checkLocal = localStorage.getItem('user');
    if (!checkLocal) {
      router.push(ROUTES.QUICKPLAY);
    }
  }, []);
  const [createListOpen, setCreateListOpen] = useState<boolean>(true);
  const handleCloseCreateListOpen = () => {
    setCreateListOpen(false);
  };

  const [shareOpen, setShareOpen] = useState<boolean>(false);

  // Get id of list which clicked share button
  const [currentListID, setCurrentListID] = useState<string>('');

  const handleShare = () => {
    setShareOpen(false);
  };

  // Fetch data
  const [list, setList] = useState<ITodoList[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      await API.getTodoLists().then(res => {
        if (res.status == 200) {
          setList(res.data);
        }
      });
    };

    fetchData();
  }, []);

  if (!list) return null;

  return (
    <>
      <div className={styles['create-list-section']}>
        <div className="container">
          <div className="banner-list">
            <div className="list-content">
              <div className="list-left">
                <div
                  className="icon-arrow-left"
                  onClick={() => {
                    router.push('/action');
                  }}
                >
                  <Icon size={28} name="abc-arrow-left-circle" />
                </div>
                <div className="title-left">
                  <h3 className="title-todo">TO DO</h3>
                  <h3 className="title-todo">YOUR LIST</h3>
                </div>
              </div>
              <Button variant="contained" className="list-right" onClick={() => setCreateListOpen(true)}>
                <Icon name="abc-plus-circle" />
                <div className="title-right">New List</div>
              </Button>
            </div>
          </div>
          <div className="list-group">
            {list.map(item => (
              <div className="text-group" key={item.id}>
                <p className="title-group">{item.listName}</p>
                <div className="actions">
                  <IconButton icon="abc-share" onClick={() => setShareOpen(true)} />
                  <IconButton icon="abc-arrow-right" onClick={() => router.push(`/list/${item.id}`)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalCreateList open={createListOpen} onClose={handleCloseCreateListOpen} />
      <ModalShare open={shareOpen} onClose={handleShare} id={currentListID} />
    </>
  );
};
export default List;
