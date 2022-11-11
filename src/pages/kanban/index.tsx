import dynamic from 'next/dynamic';
import React from 'react';

import {dataTest} from './data_test';

const Kanban = dynamic(() => import('@/components/common/kanban'), {
  ssr: false
});

export default function KanbanPage() {
  return (
    <div>
      Kanabn
      <Kanban data={dataTest} />
    </div>
  );
}
