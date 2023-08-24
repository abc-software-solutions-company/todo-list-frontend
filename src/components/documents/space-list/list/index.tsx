import cls from 'classnames';
import React, {Fragment, useState} from 'react';

import Document from '@/components/common/document';
import {IDocumentAttribute} from '@/data/api/types/documents.type';

import SortableDocument from '../../sortable-document';

interface IDocumentListProps {
  classNames?: string;
  isShowDelete?: boolean;
  items: IDocumentAttribute[];
}

const DocumentList: React.FC<IDocumentListProps> = ({classNames, isShowDelete = true, items}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prevItems => {
      if (prevItems.includes(itemId)) {
        return prevItems.filter(id => id !== itemId);
      } else {
        return [...prevItems, itemId];
      }
    });
  };

  const renderDocument = (item: IDocumentAttribute) => (
    <>
      <Document
        className="nested-item"
        key={item.id}
        showDelete={isShowDelete}
        item={item}
        isShowChildren={expandedItems.includes(item.id)}
        onShowChildren={() => toggleExpand(item.id)}
      />
      {expandedItems.includes(item.id) && (
        <div className="nested-sortable pl-6">
          {item.children && item.children.map(child => <Fragment key={child.id}>{renderDocument(child)}</Fragment>)}
        </div>
      )}
    </>
  );

  return (
    <SortableDocument className={cls('comp-list', classNames)} onMove={() => {}}>
      <div className="nested-sortable scrollbar max-h-[64vh] overflow-y-auto pr-1 md:pr-0">
        {items.map(item => {
          return <Fragment key={item.id}>{renderDocument(item)}</Fragment>;
        })}
      </div>
    </SortableDocument>
  );
};

export default DocumentList;
