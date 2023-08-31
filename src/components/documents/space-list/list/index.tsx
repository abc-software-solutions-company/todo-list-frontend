import cls from 'classnames';
import React, {Fragment, useState} from 'react';

import Document from '@/components/common/document';
import {IDocumentAttribute} from '@/data/api/types/documents.type';

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
        key={item.id}
        showDelete={isShowDelete}
        item={item}
        isShowChildren={expandedItems.includes(item.id)}
        onShowChildren={() => toggleExpand(item.id)}
      />
      <div className={cls('pl-6', !expandedItems.includes(item.id) && 'hidden')}>
        {item.children && item.children.map(child => <Fragment key={child.id}>{renderDocument(child)}</Fragment>)}
      </div>
    </>
  );

  return (
    <div className={cls('comp-document-list', classNames)}>
      {items.map(item => (
        <Fragment key={item.id}>{renderDocument(item)}</Fragment>
      ))}
    </div>
  );
};

export default DocumentList;
