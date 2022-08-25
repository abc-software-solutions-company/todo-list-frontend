import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

import IconAdd from '@/assets/images/icon-add.svg';
import IconArrowLeft from '@/assets/images/icon-arrow-left.svg';
import IconDelete from '@/assets/images/icon-delete.svg';
import IconEdit from '@/assets/images/icon-edit.svg';
import IconShare from '@/assets/images/icon-share.svg';
import ModalCreateList from '@/components/modal-create-list';
import ModalDeleteTask from '@/components/modal-delete-task';
import ModalShare from '@/components/modal-share';
import ModalUpdateTask from '@/components/modal-update-task';
import Button from '@/core-ui/button';
import Checkbox from '@/core-ui/checkbox';
import Input from '@/core-ui/input';

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
                  <Image src={IconArrowLeft} alt="Arrow left" />
                </div>

                <div className="title-left">
                  <h3 className="title-todo">Shopping</h3>
                </div>
              </div>
              <div className="detail-right">
                <Button className="detail-items" onClick={() => setDeletedetail(true)}>
                  <Image className="items" src={IconDelete} alt="Delete" width={22} height={22} />
                  <div className="title-right">Delete</div>
                </Button>
                <Button className="detail-items" onClick={() => setShareOpen(true)}>
                  <Image className="items" src={IconShare} alt="Share" width={20} height={16} />
                  <div className="title-right">Share</div>
                </Button>
                <Button className=" detail-items" onClick={() => setCreateListOpen(true)}>
                  <Image className="items" src={IconAdd} alt="Add" width={22} height={22} />
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
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
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
