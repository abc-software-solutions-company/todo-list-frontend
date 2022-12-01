import {FC} from 'react';

import {ITodolistResponse} from '@/data/api/types/todolist.type';

import Item from './items';

interface IList {
  list?: ITodolistResponse[];
  hiddenFavorite?: boolean;
  hiddenEdit?: boolean;
  hiddenDelete?: boolean;
  hiddenShare?: boolean;
}
const List: FC<IList> = ({list = [], ...props}) => {
  return (
    <div className="list">
      {list.length ? list.map(todolist => <Item {...props} key={todolist.id} todolist={todolist} />) : <span className="empty">Empty list</span>}
    </div>
  );
};

export default List;
