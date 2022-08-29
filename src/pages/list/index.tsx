import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import ModalCreateList from '@/components/modal-create-list';
import ModalShare from '@/components/modal-share';
import Button from '@/core-ui/button';
import IconButton from '@/core-ui/ico-button';
import Icon from '@/core-ui/icon';
import useCheckUserLocalStorage from '@/hooks/useCheckUserLocalStorage';
import useList from '@/hooks/useList';

import styles from './style.module.scss';
import useToast from '@/core-ui/toast';
import Auth from '../auth';

const List: React.FC = () => {
  const router = useRouter();
  const {list} = useList();

  const [createListOpen, setCreateListOpen] = useState<boolean>(true);
  const [currentListID, setCurrentListID] = useState<string>('');
  const [shareOpen, setShareOpen] = useState<boolean>(false);

  const handleCloseCreateListOpen = () => {
    setCreateListOpen(false);
  };

  const handleShare = () => {
    setShareOpen(false);
  };

  useEffect(() => {
    const open = localStorage.getItem('modalCreateList');
    if (open === 'open') {
      setCreateListOpen(false);
    }
  }, []);

  if (!list) return null;

  return (
    <Auth>
      <div className={styles['create-list-section']}>
        <div className="container">
          <div className="banner-list">
            <div className="list-user">
              <Icon name="abc-user" />
              <h4 className="title-user">Lam Minh Thien</h4>
            </div>
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
              <Button
                variant="contained"
                className="list-right"
                onClick={() => {
                  setCreateListOpen(true);
                }}
              >
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
                  <IconButton
                    icon="abc-share"
                    onClick={() => {
                      setShareOpen(true);
                      setCurrentListID(item.id);
                    }}
                  />
                  <IconButton
                    icon="abc-arrow-right"
                    onClick={() => {
                      router.push(`/list/${item.id}`);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalCreateList open={createListOpen} onClose={handleCloseCreateListOpen} />
      <ModalShare open={shareOpen} onClose={handleShare} id={currentListID} />
    </Auth>
  );
};
export default List;
