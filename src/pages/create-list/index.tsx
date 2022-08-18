import Image from 'next/image';
import React from 'react';

import IconAdd from '@/assets/images/icon-add.svg';
import IconArrowRight from '@/assets/images/icon-arow-right.svg';
import IconArrowLeft from '@/assets/images/icon-arrow-left.svg';
import IconShare from '@/assets/images/icon-share.svg';

import styles from './style.module.scss';

const CreateList = () => {
  return (
    <>
      <div className={styles['create-list']}>
        <div className="container">
          <div className="banner-list">
            <div className="list-content">
              <div className="list-left">
                <div className="icon-arrow-left">
                  <Image src={IconArrowLeft} alt="Arrow left" width={29} height={29} />
                </div>
                <div className="title-left">
                  <div className="title-todo">TO DO</div>
                  <div className="divided">|</div>
                  <div className="title-todo">YOUR LIST</div>
                </div>
              </div>
              <div className="list-right">
                <div className="icon-add">
                  <Image src={IconAdd} alt="Add" width={22} height={22} />
                </div>
                <div className="title-right">Create new List</div>
              </div>
            </div>
          </div>
          <hr />
          <div className="list-group">
            <div className="text-group">
              <p className="title-group">Shopping</p>
              <div className="icon-group">
                <button className="btn-hover-hand">
                  {' '}
                  <Image src={IconShare} alt="Add" width={22} height={22} />
                </button>
                <button className="btn-hover-hand" width={20} height={10}>
                  <Image src={IconArrowRight} alt="Add" />
                </button>
              </div>
            </div>
            <div className="text-group">
              <p className="title-group">Study</p>
              <div className="icon-group">
                <button className="btn-hover-hand">
                  {' '}
                  <Image src={IconShare} alt="Add" width={22} height={22} />
                </button>
                <button className="btn-hover-hand" width={20} height={10}>
                  <Image src={IconArrowRight} alt="Add" />
                </button>
              </div>
            </div>
            <div className="text-group">
              <p className="title-group">Relax</p>
              <div className="icon-group">
                <button className="btn-hover-hand">
                  {' '}
                  <Image src={IconShare} alt="Add" width={22} height={22} />
                </button>
                <button className="btn-hover-hand" width={20} height={10}>
                  <Image src={IconArrowRight} alt="Add" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateList;
