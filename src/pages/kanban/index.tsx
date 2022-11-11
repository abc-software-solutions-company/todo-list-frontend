import dynamic from 'next/dynamic';
import React from 'react';

const Kanban = dynamic(() => import('@/components/common/kanban'), {
  ssr: false
});
export default function KanbanPage() {
  return (
    <div>
      Kanabn
      <Kanban />
    </div>
  );
}
