/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent} from '@dnd-kit/core';
import React, {useState} from 'react';

import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from '../column';
import KanbanColumnBody from '../column/body';
import KanbanTaskItem from '../column/body/item';
import KanbanColumnFooter from '../column/footer';
import KanbanColumnHeader from '../column/header';
import useKanbanContainer from './hook';
import style from './style.module.scss';

const KanbanContainer = () => {
  const {todolistKanban, statusList} = useTodolist();
  const {sensors, handleDragCancel, handleDragEnd, handleDragOver, handleDragStart, activeId} = useKanbanContainer();
  if (todolistKanban)
    return (
      <>
        <div className={style['kanban-container']}>
          <div className="kanban-container-scroll">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragCancel={handleDragCancel}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              {Object.keys(todolistKanban).map((columnId, idx) => (
                <KanbanColumn key={idx}>
                  <KanbanColumnHeader color={statusList[idx].color} name={statusList[idx].name} />
                  <KanbanColumnBody id={columnId} tasks={todolistKanban[columnId]} />
                  <KanbanColumnFooter id={statusList[idx].id} />
                </KanbanColumn>
              ))}
              <DragOverlay>
                {activeId ? (
                  <div className="task-kanban-overlay list-none">
                    <KanbanTaskItem task={activeId} />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </>
    );

  return null;
};

export default KanbanContainer;
