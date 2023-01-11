import {DndContext, DragOverlay, useDroppable} from '@dnd-kit/core';
import {horizontalListSortingStrategy, SortableContext} from '@dnd-kit/sortable';
import React, {memo} from 'react';

import KanbanColumn from '../column';
import KanbanColumnBody from '../column/body';
import KanbanTaskItem from '../column/body/item';
import KanbanColumnFooter from '../column/footer/add-task';
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
    columnDragActive,
    columnOrderState
  } = useKanbanContainer();

  const {setNodeRef} = useDroppable({id: 'drag-column'});

  return (
    <div className={style['kanban-container']}>
      <div className="inner">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          autoScroll={true}
        >
          <SortableContext id="drag-column" items={[...columnOrderState]} strategy={horizontalListSortingStrategy}>
            {columnOrderState.map((columnId: string) => (
              <div className="kanban-wrapper" key={columnId} ref={setNodeRef}>
                <KanbanColumn id={'column' + columnId}>
                  <KanbanColumnHeader
                    name={statusList.filter(e => e.id == Number(columnId))[0]?.name || ''}
                    color={statusList.filter(e => e.id == Number(columnId))[0]?.color || ''}
                  />
                  <KanbanColumnBody id={columnId} taskIds={boardData[Number(columnId)]} />
                  <KanbanColumnFooter id={Number(columnId)} />
                </KanbanColumn>
              </div>
            ))}
            {taskActive && (
              <DragOverlay>
                <KanbanTaskItem id={taskActive.toString()} />
              </DragOverlay>
            )}

            {columnDragActive && (
              <DragOverlay>
                <div className="kanban-wrapper bg-[#f6fafe]" key={columnDragActive} ref={setNodeRef}>
                  <KanbanColumn id={'column' + columnDragActive}>
                    <KanbanColumnHeader
                      name={statusList.filter(e => e.id == Number(columnDragActive))[0].name}
                      color={statusList.filter(e => e.id == Number(columnDragActive))[0].color}
                    />
                    <KanbanColumnBody id={columnDragActive} taskIds={boardData[Number(columnDragActive)]} />
                    <KanbanColumnFooter id={Number(columnDragActive)} />
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

export default memo(KanbanContainer);
