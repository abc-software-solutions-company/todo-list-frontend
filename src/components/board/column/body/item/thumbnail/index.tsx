/* eslint-disable @next/next/no-img-element */
import React from 'react';

import style from './style.module.scss';

interface IKanbanTaskThumbnail {
  url: string;
}

export default function KanbanTaskThumbnail({url}: IKanbanTaskThumbnail) {
  return (
    <div className={style['task-thumbnail']}>
      <img src={url} alt={url} />
    </div>
  );
}
