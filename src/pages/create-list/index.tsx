import Image from 'next/image';
import React from 'react';

import IconAdd from '@/assets/images/icon-add.svg';
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
                <div className="content-share">
                  <div className="icon-share">
                    <Image src={IconShare} alt="Share" width={18} height={14} />
                  </div>
                  <div className="title-right">Share</div>
                </div>
                <div className="content-create">
                  <div className="icon-add">
                    <Image src={IconAdd} alt="Add" width={29} height={29} />
                  </div>
                  <div className="title-right">Create new List</div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="list-input-group">
            <input type="text" name="" id="" /> <br />
            <input type="text" name="" id="" /> <br />
            <input type="text" name="" id="" />
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateList;
