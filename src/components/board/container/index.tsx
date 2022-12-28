/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent} from '@dnd-kit/core';
import React, {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import KanbanColumn from '../column';
import KanbanColumnBody from '../column/body';
import KanbanTaskItem from '../column/body/item';
import KanbanColumnFooter from '../column/footer';
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
          {Object.keys(boardData).map((columnId, idx) => {
            return (
              <KanbanColumn key={columnId}>
                <KanbanColumnHeader name={columnId} color={'red'} />
                <KanbanColumnBody id={columnId} tasks={boardData[Number(columnId)]} />
                {/* <KanbanColumnFooter id={Number(columnId)} /> */}
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
