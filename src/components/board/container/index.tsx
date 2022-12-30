import {DndContext, DragOverlay, useDroppable} from '@dnd-kit/core';
import {horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useEffect, useState} from 'react';

import KanbanColumn from '../column';
import KanbanColumnBody from '../column/body';
import KanbanTaskItem from '../column/body/item';
import KanbanColumnHeader from '../column/header';
import useKanbanContainer from './hook';
import style from './style.module.scss';

const KanbanContainer = () => {
  const {boardData, statusList, sensors, handleDragCancel, handleDragEnd, handleDragOver, handleDragStart, taskActive} =
    useKanbanContainer();

  const {setNodeRef} = useDroppable({id: 'drag-column'});

  const [windowHeight, setWindowHeight] = useState(750);

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', () => {
        if (windowHeight > 0) setWindowHeight(window.innerHeight * 0.7);
      });
    }
  }, []);

  return (
    <div className={style['kanban-container']}>
      <div className="kanban-container-scroll" style={{height: windowHeight}}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext id="drag-column" items={Object.keys(boardData)} strategy={verticalListSortingStrategy}>
            {Object.keys(boardData).map(columnId => {
              return (
                <div className="kanban-wrapper border" key={columnId} ref={setNodeRef}>
                  <KanbanColumn>
                    <KanbanColumnHeader
                      name={statusList.filter(e => e.id == Number(columnId))[0].name}
                      color={statusList.filter(e => e.id == Number(columnId))[0].color}
                    />
                    <KanbanColumnBody id={columnId} tasks={boardData[Number(columnId)]} />
                  </KanbanColumn>
                </div>
              );
            })}
            {taskActive && (
              <DragOverlay>
                <KanbanTaskItem task={taskActive} />
              </DragOverlay>
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanContainer;
