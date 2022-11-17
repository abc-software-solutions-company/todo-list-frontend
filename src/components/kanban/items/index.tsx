import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

interface IItemProps {
  data: ITaskResponse;
}
const Item: FC<IItemProps> = ({data}) => {
  const {id, name} = data;
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="rounded border bg-sky-300 py-3 text-center">{name}</div>
    </div>
  );
};
export default Item;
