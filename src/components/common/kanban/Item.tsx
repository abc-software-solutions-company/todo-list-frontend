import './Item.css';

import React from 'react';

interface IItemKanbanProp {
  id: any;
  dragOverlay: any;
}

const Item = ({id, dragOverlay}: IItemKanbanProp) => {
  const style = {
    cursor: dragOverlay ? 'grabbing' : 'grab'
  };

  return (
    <div style={style} className="item">
      Item {id}
    </div>
  );
};

export default Item;
