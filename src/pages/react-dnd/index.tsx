/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {DragDropContext, Draggable, DropResult, Droppable} from 'react-beautiful-dnd';

const listItems = [
  {
    id: '1',
    name: 'Thien'
  },
  {
    id: '2',
    name: 'Hung'
  },
  {
    id: '3',
    name: 'Huy'
  },
  {
    id: '4',
    name: 'Linh'
  },
  {
    id: '5',
    name: 'Phuoc'
  },
  {
    id: '6',
    name: 'Tuyen'
  }
];

export default function App() {
  const [todo, setTodos] = useState(listItems);
  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    if (!destination) return;
    const items = Array.from(todo);

    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodos(items);
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 10,
    margin: '0 50px 15px 50px',
    background: isDragging ? '#4a2975' : 'white',
    colors: isDragging ? 'white' : 'black',
    border: '1px solid black',
    fontSize: '20px',
    borderRadius: '5px',
    ...draggableStyle
  });
  return (
    <div className="App">
      <h1>Drag and drop</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {provided => (
            <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
              {todo.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
