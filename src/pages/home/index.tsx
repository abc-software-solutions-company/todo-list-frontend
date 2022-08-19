import React from 'react';

import styles from './style.module.scss';

import TodoListLogoBig from '../../components/icons/todolist-logo-big';
import EnterYourName from '@/components/enter-your-name';
import TodoListLogoSmall from '@/components/icons/todolist-logo-small';

const HomePage: React.FC = () => {
  return (
    <>
      <div className={styles['section-todo-list']}>
        <div className="container">
          <div className="inner">
            <div className="logo-wrapper-big">
              <TodoListLogoBig />
            </div>
            <div className="logo-wrapper-small">
              <TodoListLogoSmall />
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
