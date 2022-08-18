import React from 'react';

import styles from './style.module.scss';

import TodoListLogo from '../../components/icons/todolist-logo';
import EnterYourName from '@/components/enter-your-name';

const HomePage: React.FC = () => {
  return (
    <>
      <div className={styles['section-todo-list']}>
        <div className="container">
          <div className="inner">
            <div className="logo-wrapper">
              <TodoListLogo />
            </div>
            <EnterYourName />
            <div className="copyright">Copyright © 2022 By ABC Software Solutions Company.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
