import {DndContext, DragOverlay, useDroppable} from '@dnd-kit/core';
import {horizontalListSortingStrategy, SortableContext} from '@dnd-kit/sortable';
import React, {useEffect, useState} from 'react';

import KanbanColumn from '../column';
import KanbanColumnBody from '../column/body';
import KanbanTaskItem from '../column/body/item';
import KanbanColumnHeader from '../column/header';
import useKanbanContainer from './hook';
import style from './style.module.scss';

const KanbanContainer = () => {
  const {
    boardData,
    statusList,
    sensors,
    handleDragCancel,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    taskActive,
    isColumnSelected,
    columnActive
  } = useKanbanContainer();

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
          <SortableContext
            id="drag-column"
            items={[...Object.keys(boardData)]}
            strategy={horizontalListSortingStrategy}
          >
            {Object.keys(boardData).map(columnId => (
              <div className="kanban-wrapper border" key={columnId} ref={setNodeRef}>
                <KanbanColumn id={'column' + columnId}>
                  <KanbanColumnHeader
                    name={statusList.filter(e => e.id == Number(columnId))[0].name}
                    color={statusList.filter(e => e.id == Number(columnId))[0].color}
                  />
                  <KanbanColumnBody id={columnId} tasks={boardData[Number(columnId)]} />
                </KanbanColumn>
              </div>
            ))}
            {taskActive && (
              <DragOverlay>
                <KanbanTaskItem task={taskActive} />
              </DragOverlay>
            )}

            {columnActive && (
              <DragOverlay>
                <div className="kanban-wrapper border" key={columnActive} ref={setNodeRef}>
                  <KanbanColumn id={'column' + columnActive}>
                    <KanbanColumnHeader
                      name={statusList.filter(e => e.id == Number(columnActive))[0].name}
                      color={statusList.filter(e => e.id == Number(columnActive))[0].color}
                    />
                    <KanbanColumnBody id={columnActive} tasks={boardData[Number(columnActive)]} />
                  </KanbanColumn>
                </div>
              </DragOverlay>
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanContainer;
