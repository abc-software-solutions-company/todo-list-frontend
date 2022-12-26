import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanColumnFooter from './column/footer';
import KanbanColumnHeader from './column/header';
import KanbanContainer from './container';

const ListTaskKanban = () => {
  const {todolistKanban, todolist, statusList} = useTodolist();

  if (todolistKanban)
    return (
      // <KanbanContainer>
      //   {todolist.status.map(column => (
      //     <KanbanColumn key={column.id} id={column.id}>
      //       <KanbanColumnHeader name={column.name} color={column.color} />
      //       <KanbanColumnBody statusId={column.id} tasks={todolist.tasks.filter(e => e.statusId == column.id)} />
      //       <KanbanColumnFooter id={column.id} />
      //     </KanbanColumn>
      //   ))}
      //   {/* {Object.keys(todolistKanban).map(group => (

      //   ))} */}
      // </KanbanContainer>
      // <KanbanContainer>
      //   {Object.keys(todolistKanban).map((column,idx) => (
      //     <KanbanColumn key={idx}>
      //       <KanbanColumnHeader  />
      //     </KanbanColumn>
      //     // <KanbanColumnHeader color={statusList[idx].color} name={statusList[idx].name}/>
      //   )}
      // </KanbanContainer>
      // <KanbanContainer>
      //   {Object.keys(todolistKanban).map((column, idx) => (
      //     <>
      //       <KanbanColumn key={idx}>
      //         <KanbanColumnHeader name={statusList[idx].name} color={statusList[idx].color} />
      //         <KanbanColumnBody tasks={} />
      //       </KanbanColumn>
      //     </>
      //   ))}
      // </KanbanContainer>
      <KanbanContainer>
        <></>
      </KanbanContainer>
    );

  return <></>;
};

export default ListTaskKanban;
