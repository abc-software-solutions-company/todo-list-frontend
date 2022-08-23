import {useRouter} from 'next/router';
import Image from 'next/image';
import React, {useState} from 'react';
import IconAdd from '@/assets/images/icon-add.svg';
import IconArrowRight from '@/assets/images/icon-arow-right.svg';
import IconArrowLeft from '@/assets/images/icon-arrow-left.svg';
import IconShare from '@/assets/images/icon-share.svg';
import styles from './style.module.scss';
import Button from '@/core-ui/button';
import ModalCreateList from '@/components/modal-create-list';
import ModalShare from '@/components/modal-share';
const List: React.FC = () => {
  const router = useRouter();
  const [createListOpen, setCreateListOpen] = useState<boolean>(false);
  const handleCloseCreateListOpen = () => {
    setCreateListOpen(false);
  };

  const [shareOpen, setShareOpen] = useState<boolean>(false);

  const handleShare = () => {
    setShareOpen(false);
  };
  return (
    <>
      <div className={styles['section-create-list']}>
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
                  <Image src={IconArrowLeft} alt="Arrow left" z />
                </div>

                <div className="title-left">
                  <h3 className="title-todo">TO DO</h3>
                  <h3 className="title-todo">YOUR LIST</h3>
                </div>
              </div>
              <div className="list-right">
                <Button className="icon-add" onClick={() => setCreateListOpen(true)}>
                  <Image src={IconAdd} alt="Add" width={22} height={22} />
                </Button>
                <div className="title-right">New List</div>
              </div>
            </div>
          </div>
          <div className="list-group">
            <div className="text-group">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setShareOpen(true)}>
                  <Image src={IconShare} alt="Share" width={20} height={16} />
                </Button>
                <Button
                  className="btn-hover-hand"
                  width={11}
                  height={19}
                  onClick={() => {
                    router.push('/detail');
                  }}
                >
                  <Image src={IconArrowRight} alt="Arrow right" />
                </Button>
              </div>
            </div>
            <div className="text-group">
              <p className="title-group">Study</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setShareOpen(true)}>
                  <Image src={IconShare} alt="Share" width={20} height={16} />
                </Button>
                <Button
                  className="btn-hover-hand"
                  width={11}
                  height={19}
                  onClick={() => {
                    router.push('/detail');
                  }}
                >
                  <Image src={IconArrowRight} alt="Arrow right" />
                </Button>
              </div>
            </div>
            <div className="text-group">
              <p className="title-group">Relax</p>
              <div className="icon-group">
                <Button className="btn-hover-hand" onClick={() => setShareOpen(true)}>
                  <Image src={IconShare} alt="Share" width={20} height={16} />
                </Button>
                <Button
                  className="btn-hover-hand"
                  width={11}
                  height={19}
                  onClick={() => {
                    router.push('/detail');
                  }}
                >
                  <Image src={IconArrowRight} alt="Arrow right" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCreateList open={createListOpen} onClose={handleCloseCreateListOpen} />
      <ModalShare open={shareOpen} onClose={handleShare} />
    </>
  );
};
export default List;
