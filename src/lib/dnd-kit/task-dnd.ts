import {arrayMove} from '@dnd-kit/sortable';

import {ITodo} from '@/api/types/todo.type';

export const TaskDND = (event: any, todoList: ITodo) => {
  const {active, over} = event;
  if (!over) return;

  if (active.id !== over.id) {
    const oldIndex = todoList?.tasks?.findIndex(item => active.id === item.id);
    const newIndex = todoList?.tasks?.findIndex(item => over.id === item.id);

    const arrangeTask = arrayMove(todoList!.tasks!, oldIndex!, newIndex!);
    return {...todoList, tasks: arrangeTask};
  }
};
