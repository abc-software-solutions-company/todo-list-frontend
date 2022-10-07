import {ITodo} from '@/api/types/todo.type';

interface IProp {
  todoList: ITodo;
}

export default function ToolbarDetail({todoList}: IProp) {
  return (
    <>
      <div className="toolbar">
        <div className="left">
          <div className="title">
            <p>{todoList.name}</p>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </>
  );
}
