import Image from 'next/image';
import React from 'react';

import logoRoom from '@/assets/images/logo-ABC-company.png';

import styles from './style.module.scss';

const CreateRoom = () => {
  return (
    <>
      <div className={styles['create-room']}>
        <div className="container">
          <div className="section-room">
            <div className="logo-abc">
              <Image src={logoRoom} alt="Logo Room" width={279} />
            </div>
            <div className="title-room">
              <p className="title-todo">TO DO LIST</p>
              <p className="description-todo">Organize your work and life, finally.</p>
            </div>
            <div className="section-btn">
              <div className="btn">
                <button className="title-btn">+ Create New List</button>
              </div>
              <div className="input-group-room  ">
                <input type="text" className="form-control-room" placeholder="Enter link or ID" />
                <span className="input-group-text ">Join</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateRoom;
