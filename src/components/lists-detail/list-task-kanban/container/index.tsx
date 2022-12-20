import React, {ReactNode} from 'react';

import style from './style.module.scss';

interface IKanbanContainer {
  children: ReactNode;
}

const KanbanContainer = ({children}: IKanbanContainer) => {
  return (
    <>
      <div className={style['kanban-container']}>{children}</div>
    </>
  );
};

export default KanbanContainer;
