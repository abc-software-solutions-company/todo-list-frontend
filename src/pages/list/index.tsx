import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API, {ITodoList} from '@/api/network/todo-list';
import ModalCreateList from '@/components/modal-create-list';
import ModalShare from '@/components/modal-share';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';

import styles from './style.module.scss';

const List: React.FC = () => {
  const router = useRouter();
  const [createListOpen, setCreateListOpen] = useState<boolean>(true);
  const handleCloseCreateListOpen = () => {
    setCreateListOpen(false);
  };

  const [shareOpen, setShareOpen] = useState<boolean>(false);

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
                  <Icon size={29} className="abc-arrow-left-circle" />
                </div>

                <div className="title-left">
                  <h3 className="title-todo">TO DO</h3>
                  <h3 className="title-todo">YOUR LIST</h3>
                </div>
              </div>
              <Button className="list-right" onClick={() => setCreateListOpen(true)}>
                <Icon size={22} className="abc-plus-circle" />
                <div className="title-right">New List</div>
              </Button>
            </div>
          </div>
          <div className="list-group">
            {list.map(item => (
              <div className="text-group" key={item.id}>
                <p className="title-group">{item.listName}</p>
                <div className="icon-group">
                  <Button className="btn-hover-hand" onClick={() => setShareOpen(true)}>
                    <Icon size={22} className="abc-share" />
                  </Button>
                  <Button
                    className="btn-hover-hand"
                    onClick={() => {
                      router.push(`/list/${item.id}`);
                    }}
                  >
                    <Icon size={22} className="abc-arrow-right" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalCreateList open={createListOpen} onClose={handleCloseCreateListOpen} />
      <ModalShare open={shareOpen} onClose={handleShare} />
    </>
  );
};
export default List;
