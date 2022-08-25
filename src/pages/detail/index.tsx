import {useRouter} from 'next/router';
import React, {useState} from 'react';

import ModalCreateList from '@/components/modal-create-list';
import ModalDeleteTask from '@/components/modal-delete-task';
import ModalShare from '@/components/modal-share';
import ModalUpdateTask from '@/components/modal-update-task';
import Button from '@/core-ui/button';
import Checkbox from '@/core-ui/checkbox';
import Icon from '@/core-ui/icon';

import styles from './style.module.scss';

const Detail: React.FC = () => {
  const router = useRouter();
  const [createListOpen, setCreateListOpen] = useState<boolean>(false);
  const handleCloseCreateListOpen = () => {
    setCreateListOpen(false);
  };

  const [shareOpen, setShareOpen] = useState<boolean>(false);

  const handleShare = () => {
    setShareOpen(false);
  };

  const [editDetail, setEditdetail] = useState<boolean>(false);

  const handleEdit = () => {
    setEditdetail(false);
  };

  const [deleteDetail, setDeletedetail] = useState<boolean>(false);

  const handleDelete = () => {
    setDeletedetail(false);
  };
  return (
    <>
      <div className={styles['create-detail-section']}>
        <div className="container">
          <div className="banner-detail">
            <div className="detail-content">
              <div className="detail-left">
                <div
                  className="icon-arrow-left"
                  onClick={() => {
                    router.push('/action');
                  }}
                >
                  <Icon size={29} className="abc-arrow-left-circle" />
                </div>
                <h3 className="title-todo">Shopping</h3>
              </div>
              <div className="detail-right">
                <Button className="detail-items" onClick={() => setDeletedetail(true)}>
                  <Icon size={22} className="abc-trash" />
                  <div className="title-right">Delete</div>
                </Button>
                <Button className="detail-items" onClick={() => setShareOpen(true)}>
                  <Icon size={22} className="abc-share" />
                  <div className="title-right">Share</div>
                </Button>
                <Button className=" detail-items" onClick={() => setCreateListOpen(true)}>
                  <Icon size={22} className="abc-plus-circle" />
                  <div className="title-right">Add To-Do</div>
                </Button>
              </div>
            </div>
          </div>
          <div className="detail-group">
            <div className="detail-list">
              <div className="flex items-center justify-between gap-3 ">
                <Checkbox />
                <p className="title-group">Shopping</p>
              </div>

              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Icon size={24} className="abc-edit" />
                </Button>
                <Button className="btn-hover-hand" onClick={() => setDeletedetail(true)}>
                  <Icon size={24} className="abc-trash" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCreateList open={createListOpen} onClose={handleCloseCreateListOpen} />
      <ModalShare open={shareOpen} onClose={handleShare} />
      <ModalDeleteTask open={deleteDetail} onClose={handleDelete} />
      <ModalUpdateTask open={editDetail} onClose={handleEdit} />
    </>
  );
};

export default Detail;
