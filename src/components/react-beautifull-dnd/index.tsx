import React, {useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import {ITaskResponse} from '@/data/api/types/task.type';

interface IKanbanProp {
  itemsFromBackend: ITaskResponse[];
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const {source, destination} = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
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

const ReactBeautifullDND = ({itemsFromBackend}: IKanbanProp) => {
  const columnsFromBackend = {
    [1]: {
      name: 'Requested',
      items: itemsFromBackend.filter(x => x.statusId == 1)
    },
    [2]: {
      name: 'To-Do',
      items: itemsFromBackend.filter(x => x.statusId == 2)
    },
    [3]: {
      name: 'In-progress',
      items: itemsFromBackend.filter(x => x.statusId == 3)
    },
    [4]: {
      name: 'In-review',
      items: itemsFromBackend.filter(x => x.statusId == 4)
    },
    [5]: {
      name: 'In-QA',
      items: itemsFromBackend.filter(x => x.statusId == 5)
    },
    [6]: {
      name: 'Done',
      items: itemsFromBackend.filter(x => x.statusId == 6)
    }
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  console.log('🚀 ~ file: index.tsx:76 ~ ReactBeautifullDND ~ columns', Object.entries(columns));
  return (
    <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
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
  );
};

export default ReactBeautifullDND;
