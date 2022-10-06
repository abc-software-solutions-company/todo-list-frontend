import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

export default function SortableItem({id, title, content}: any) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{title}</p>
      <h1>{content}</h1>
    </div>
  );
}
