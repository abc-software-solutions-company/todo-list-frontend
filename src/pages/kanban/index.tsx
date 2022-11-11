import React from 'react';
const Kanban = dynamic(() => import('@/components/common/kanban'), {
  ssr: false,
})
export default function Kanban() {
  return <div>Kanabn
    <Kanban/>
  </div>;
}
