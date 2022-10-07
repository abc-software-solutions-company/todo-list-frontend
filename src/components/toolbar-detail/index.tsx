import {ITodo} from '@/api/types/todo.type';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';

interface IProp {
  todoList: ITodo;
  editTodo: () => void;
}

export default function ToolbarDetail({todoList, editTodo}: IProp) {
  return (
    <>
      <div className="toolbar">
        <div className="left">
          <div className="title">
            <p>{todoList.name}</p>
          </div>
        </div>
      </div>
      <div className="right">
        <Button className="btn-edit" startIcon={<Icon name="ico-edit" />} onClick={editTodo}>
          <span className="h5 font-medium">Edit</span>
        </Button>
      </div>
    </>
  );
}
