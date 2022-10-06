/* eslint-disable @typescript-eslint/no-shadow */
import {DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors} from '@dnd-kit/core';
import {SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import {dataTest} from './data-test';
import SortableItem from './SortableItem';

export default function App() {
  const [items, setItems] = useState(dataTest);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(item => (
          <SortableItem key={item.id} id={item.id} />
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
