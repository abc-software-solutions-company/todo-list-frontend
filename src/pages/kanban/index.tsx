import dynamic from 'next/dynamic';
import React from 'react';

import {dataTest} from '../../utils/data_test_kanban';

const Kanban = dynamic(() => import('@/components/common/kanban'), {
  ssr: false
});

export default function KanbanPage() {
  return (
    <div>
      Kanban Component, Send data via prop
      <Kanban data={dataTest} />
    </div>
  );
}
