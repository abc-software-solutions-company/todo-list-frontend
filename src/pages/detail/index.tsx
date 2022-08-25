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
                <div className="detail-items">
                  <Button className="items" onClick={() => setDeletedetail(true)}>
                    <Image src={IconDelete} alt="Delete" width={22} height={22} />
                  </Button>
                  <div className="title-right">Delete</div>
                </div>
                <div className="detail-items items-share">
                  <Button className="items" onClick={() => setShareOpen(true)}>
                    <Image src={IconShare} alt="Share" width={20} height={16} />
                  </Button>
                  <div className="title-right">Share</div>
                </div>
                <div className="detail-items">
                  <Button className="items" onClick={() => setCreateListOpen(true)}>
                    <Image src={IconAdd} alt="Add" width={22} height={22} />
                  </Button>
                  <div className="title-right">Add To-Do</div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-group">
            <div className="detail-list">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
                </Button>
              </div>
            </div>
            <div className="detail-list">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
                </Button>
              </div>
            </div>
            <div className="detail-list">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
                </Button>
              </div>
            </div>
            <div className="detail-list">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
                </Button>
              </div>
            </div>
            <div className="detail-list">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
                </Button>
              </div>
            </div>
            <div className="detail-list">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
                </Button>
              </div>
            </div>
            <div className="detail-list">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
                </Button>
              </div>
            </div>
            <div className="detail-list">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setEditdetail(true)}>
                  <Image src={IconEdit} alt="Edit" width={20} height={16} />
                </Button>
                <Button className="btn-hover-hand" width={11} height={19} onClick={() => setDeletedetail(true)}>
                  <Image src={IconDelete} alt="Delete" />
                </Button>
              </div>
            </div>
            <div className="detail-list">
              <p className="title-group">Shopping</p>
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
