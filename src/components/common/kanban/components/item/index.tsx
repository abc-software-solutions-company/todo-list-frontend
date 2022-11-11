import React from 'react';

import style from './style.module.scss';

interface IItemKanbanProp {
  id: any;
  dragOverlay: any;
}

const Item = ({id, dragOverlay}: IItemKanbanProp) => {
  const styleOverLay = {
    cursor: dragOverlay ? 'grabbing' : 'grab'
  };

  return (
    <div style={styleOverLay} className={style['item-kanban']}>
      Item {id}
    </div>
  );
};

export default Item;
