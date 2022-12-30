import {DndContext, DragOverlay} from '@dnd-kit/core';
import React, {useEffect, useState} from 'react';

import KanbanColumn from '../column';
import KanbanColumnBody from '../column/body';
import AddTaskKanban from '../column/body/add-task';
import KanbanTaskItem from '../column/body/item';
import KanbanColumnHeader from '../column/header';
import useKanbanContainer from './hook';
import style from './style.module.scss';

const KanbanContainer = () => {
  const {boardData, statusList, sensors, handleDragCancel, handleDragEnd, handleDragOver, handleDragStart, taskActive} =
    useKanbanContainer();

  return (
    <div className={style['kanban-container']}>
      <div className="kanban-container-scroll">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {Object.keys(boardData).map(columnId => {
            return (
              <KanbanColumn key={columnId}>
                <KanbanColumnHeader
                  name={statusList.filter(e => e.id == Number(columnId))[0].name}
                  color={statusList.filter(e => e.id == Number(columnId))[0].color}
                />
                <KanbanColumnBody id={columnId} tasks={boardData[Number(columnId)]} />
                <AddTaskKanban id={Number(columnId)} />
              </KanbanColumn>
            );
          })}
          {taskActive && (
            <DragOverlay>
              <KanbanTaskItem task={taskActive} />
            </DragOverlay>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanContainer;
