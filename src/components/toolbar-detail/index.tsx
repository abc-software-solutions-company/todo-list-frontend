import {ITodo} from '@/api/types/todo.type';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';

interface IProp {
  todoList: ITodo;
  editTodo: () => void;
  deleteTodo: () => void;
  shareTodo: () => void;
  addTodo: () => void;
}

export default function ToolbarDetail({todoList, editTodo, deleteTodo, shareTodo, addTodo}: IProp) {
  return (
    <>
      <div className="toolbar">
        <div className="left">
          {/* List Title */}
          <div className="title">
            <p>{todoList.name}</p>
          </div>
        </div>
      </div>
      <div className="right">
        {/* List Edit Button */}
        <Button className="btn-edit" startIcon={<Icon name="ico-edit" />} onClick={editTodo}>
          <span className="h5 font-medium">Edit</span>
        </Button>
        {/* List Delete Button */}
        <Button startIcon={<Icon name="ico-trash-2" />} onClick={deleteTodo}>
          <span className="h5 font-medium">Delete List</span>
        </Button>
        {/* List Share Button */}
        <Button className="btn-share" startIcon={<Icon name="ico-share-2" />} onClick={shareTodo}>
          <span className="h5 font-medium">Share</span>
        </Button>
        {/* List Add Button */}
        <Button className="btn-add-todo" startIcon={<Icon name="ico-plus-circle" />} onClick={addTodo}>
          <span className="h5 font-medium">Add To-Do</span>
        </Button>
      </div>
    </>
  );
}
