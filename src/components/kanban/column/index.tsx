import {SortableContext} from '@dnd-kit/sortable';
import {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import Item from '../items';

interface IColumnProps {
  items: ITaskResponse[];
}
const Column: FC<IColumnProps> = ({items}) => {
  return (
    <>
      <SortableContext items={items}>
        {items.map(item => (
          <Item key={item.id} data={item} />
        ))}
      </SortableContext>
    </>
  );
};

export default Column;
