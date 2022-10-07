/* eslint-disable @typescript-eslint/no-shadow */
import {DndContext} from '@dnd-kit/core';
import {SortableContext, arrayMove, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import SortableItem from './SortableItem';

export default function App() {
  const [items, setItems] = useState([
    {
      id: 'a',
      title: 'item 1',
      content: 'content 1'
    },
    {
      id: 'b',
      title: 'item 2',
      content: 'content 2'
    },
    {
      id: 'c',
      title: 'item 3',
      content: 'content 3'
    },
    {
      id: 'd',
      title: 'item 4',
      content: 'content 4'
    },
    {
      id: 'e',
      title: 'item 5',
      content: 'content 5'
    }
  ]);

  function handleDragEnd(event: any) {
    const {active, over} = event;
    // console.log('🤩 Đây là item đang kéo');
    // console.log(active); // Active là item mình muốn drag sang vị trí khác
    // console.log('😎 Đây là item bị đè lên vị trí kéo');
    // console.log(over);

    // Index của item trên
    console.log(`Index của item trên là ${parseInt(over.id) - 1}`);
    // Index của item dưới
    console.log(`Index của item dưới là ${parseInt(over.id) + 1}`);
    // Index của item đang drag
    console.log(`Index của item đang drag là ${parseInt(active.id)}`);

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
