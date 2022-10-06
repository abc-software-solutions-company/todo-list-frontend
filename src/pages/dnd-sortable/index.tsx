/* eslint-disable @typescript-eslint/no-shadow */
import {DndContext} from '@dnd-kit/core';
import {SortableContext, arrayMove, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import SortableItem from './SortableItem';

export default function App() {
  const [items, setItems] = useState([
    {
      id: '0',
      title: 'item 1',
      content: 'content 1'
    },
    {
      id: '1',
      title: 'item 2',
      content: 'content 2'
    },
    {
      id: '2',
      title: 'item 3',
      content: 'content 3'
    }
  ]);

  function handleDragEnd(event: any) {
    const {active, over} = event;

    if (active.id === over.id) {
      return;
    }
    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => active.id === item.id);
        const newIndex = items.findIndex(item => over.id === item.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        {items.map(item => (
          <SortableItem key={item.id} id={item.id} title={item.title} content={item.content} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
