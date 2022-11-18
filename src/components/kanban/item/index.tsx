import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

interface IItemProps {
  data: ITaskResponse;
  disable?: boolean;
}
const Item: FC<IItemProps> = ({data, disable = false}) => {
  const {id, name} = data;
  const sortAble = useSortable({id});
  const {attributes, listeners, setNodeRef, transform, transition} = sortAble;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={!disable ? setNodeRef : undefined} style={style} {...attributes} {...listeners}>
      <div className="rounded border bg-sky-300 py-3 text-center">{name}</div>
    </div>
  );
};
export default Item;
