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

  const {name} = JSON.parse(id);

  return (
    <div style={styleOverLay} className={style['item-kanban bg-blue-300']}>
      {name}
    </div>
  );
};

export default Item;
