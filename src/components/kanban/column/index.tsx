import {SortableContext, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';

import Item from '../item';

interface IColumnProps {
  status: IStatus;
  disable?: boolean;
  items: ITaskResponse[];
}
const Column: FC<IColumnProps> = ({items, status, disable}) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: status.id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <div ref={disable ? setNodeRef : undefined} style={style} {...attributes} {...listeners}>
      <div className="border p-2 text-center">{status.name}</div>
      <SortableContext items={items}>
        {items.map(item => (
          <Item disable={disable} key={item.id} data={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
