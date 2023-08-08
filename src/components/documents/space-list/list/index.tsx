import cls from 'classnames';
import React, {useState} from 'react';

import Document from '@/components/common/document';
import {IDocumentAttribute} from '@/data/api/types/documents.type';

interface IDocumentListProps {
  classNames?: string;
  items: IDocumentAttribute[];
}

const DocumentList: React.FC<IDocumentListProps> = ({classNames, items}) => {
  const [showChildren, setShowChildren] = useState(false);

  const renderDocument = (item: IDocumentAttribute) => (
    <Document
      className="ml-3"
      key={item.id}
      item={item}
      isShowChildren={showChildren}
      onShowChildren={() => setShowChildren(!showChildren)}
    />
  );

  return (
    <div className={cls('comp-document-list', classNames)}>
      {items.map(item => (
        <>
          {renderDocument(item)}
          <div className={cls('ml-6', !showChildren && 'hidden')}>
            {item.children && item.children.map(renderDocument)}
          </div>
        </>
      ))}
    </div>
  );
};

export default DocumentList;
