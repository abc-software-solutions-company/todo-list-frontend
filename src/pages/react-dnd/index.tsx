/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, DropResult, Droppable} from 'react-beautiful-dnd';

const listItems = [
  {
    id: 1,
    name: '0 Study Spanish'
  },
  {
    id: 1000,
    name: '1 Workout'
  },
  {
    id: 2000,
    name: '2 Film Youtube'
  },
  {
    id: 3000,
    name: '3 Bdu Shop'
  },
  {
    id: 4000,
    name: '4 Hoyo Shop'
  },
  {
    id: 5000,
    name: '5 Zaku Shop'
  },
  {
    id: 6000,
    name: '6 Igni Shop'
  }
];

export default function App() {
  const [todo, setTodo] = useState(listItems);
  const [isBrowser, setIsBrowser] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    if (!destination) return;

    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodo(items);
    // console.log(`Source =${source.index}, Destination = ${destination.index}`);
    // console.log(`Reorder task = ${todo[source.index].name}`);
    // console.log(`First Task = ${todo[destination.index].name}`);
    // console.log(items[source.index]);
    // const ItemAbove =`Item above is ${items[destination.index - 1].name}`
    // const ItemBelow = `Item Below is ${items[destination.index + 1].name}`
    // console.log(ItemAbove);
    // console.log(ItemBelow);

    const selectTaskPos = destination.index;

    // If Task need reorder move to top
    if (selectTaskPos == 0) {
      console.log('Task reorder to top');
      const firstTaskIndex = 0;
      const secondTaskIndex = destination.index + 1;
      console.log([firstTaskIndex, secondTaskIndex]);
      const selectTaskNewIndex = destination.index - 1;
      console.log(`New index for select task is ${selectTaskNewIndex}`);
    }

    // If task need reorder move to bottom
    if (selectTaskPos == items.length - 1) {
      console.log('Task reorder to bottom');
      const firstTaskIndex = destination.index - 1;
      const secondTaskIndex = items.length - 1;
      console.log([firstTaskIndex, secondTaskIndex]);
      const selectTaskNewIndex = destination.index + 1;
      console.log(`New index for select task is ${selectTaskNewIndex}`);
    }

    // If task need reorder move between tow task specific
    if (selectTaskPos > 0 && selectTaskPos < items.length - 1) {
      console.log(`Task reorder between ${items[selectTaskPos - 1].name} and ${items[selectTaskPos + 1].name}`);
      const firstTaskIndex = destination.index - 1;
      const secondTaskIndex = destination.index + 1;
      console.log([firstTaskIndex, secondTaskIndex]);
      const selectTaskNewIndex = destination.index - 1;
      console.log(`New index for select task is ${selectTaskNewIndex}`);
    }
  };

  useEffect(() => {
    setIsBrowser(process.browser);
  }, []);
  return (
    <div className="App">
      <h1>Drag and Drop</h1>
      {isBrowser ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo" direction="vertical">
            {provided => (
              <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
                {todo.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id.toString()} index={index}>
                      {provided => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {name}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : null}
    </div>
  );
}
