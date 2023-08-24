import React from 'react';

import SortableDocument from '@/components/documents/sortable-document';

export default function TestPage() {
  return (
    <SortableDocument className="w-96">
      <div className="nested-sortable">
        <div className="nested-item h-20 border bg-rose-400">Titel 1</div>
        <div className="nested-item h-20 border bg-rose-400">
          Titel 2
          <div className="nested-sortable h-20 border bg-green-400 pl-3">
            <div className="nested-item h-20 border bg-rose-400">Titel 6</div>
            <div className="nested-item h-20 border bg-rose-400">Titel 7</div>
          </div>
        </div>
        <div className="nested-item h-20 border bg-rose-400">Titel 3</div>
        <div className="nested-item h-20 border bg-rose-400">Titel 4</div>
        <div className="nested-item h-20 border bg-rose-400">Titel 5</div>
      </div>
    </SortableDocument>
  );
}
