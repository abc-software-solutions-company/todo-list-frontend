/* eslint-disable react-hooks/rules-of-hooks */
import {useRouter} from 'next/router';
import {FC, useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import useTodolist from '@/states/todolist/use-todolist';

interface IProps {
  id: string;
}

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const {source, destination} = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    console.log('🚀 ~ file: index.tsx:20 ~ onDragEnd ~ sourceItems', sourceItems);
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const Kanban: FC<IProps> = () => {
  const {todolist, initial, error, loading} = useTodolist();
  const [columns, setColumns] = useState({});

  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    initial(id as string);
    console.log('🚀 ~ file: index.tsx:51 ~ loading', loading);
  }, []);

  if (!todolist) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  if (todolist) {
    return (
      <div>
        Kanban loaded
        <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries({
              [1]: {
                name: 'Backlog',
                items: todolist.tasks.filter(x => x.statusId == 1)
              },
              [2]: {
                name: 'To-Do',
                items: todolist.tasks.filter(x => x.statusId == 2)
              },
              [3]: {
                name: 'In-progress',
                items: todolist.tasks.filter(x => x.statusId == 3)
              },
              [4]: {
                name: 'In-review',
                items: todolist.tasks.filter(x => x.statusId == 4)
              },
              [5]: {
                name: 'In-QA',
                items: todolist.tasks.filter(x => x.statusId == 5)
              },
              [6]: {
                name: 'Done',
                items: todolist.tasks.filter(x => x.statusId == 6)
              }
            }).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                  key={columnId}
                >
                  <h2>{column.name}</h2>
                  <div style={{margin: 8}}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                              padding: 4,
                              width: 250,
                              minHeight: 500
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: 'none',
                                          padding: 16,
                                          margin: '0 0 8px 0',
                                          minHeight: '50px',
                                          backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                          color: 'white',
                                          ...provided.draggableProps.style
                                        }}
                                      >
                                        {item.name}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    );
  }
};

export default Kanban;
