import {FC} from 'react';

import {ITodolistResponse} from '@/data/api/types/todolist.type';

import Item from './items';

interface IList {
  list?: ITodolistResponse[];
}
const List: FC<IList> = ({list = []}) => {
  return (
    <div className="list">{list.length ? list.map(todolist => <Item key={todolist.id} todolist={todolist} />) : <span className="empty">Empty list</span>}</div>
  );
};

export default List;
