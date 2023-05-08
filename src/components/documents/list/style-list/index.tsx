import React from 'react';

import {IGetDocuments} from '@/data/api/types/documents.type';

import RecursiveList from './recursive-list';

interface IPropsDocumentListType {
  type: string;
  listDocument: IGetDocuments[];
  className?: string;
}

const DocumentListType: React.FC<IPropsDocumentListType> = ({type, listDocument, className}) => {
  return (
    <div className={className}>
      <p className="mt-3 font-bold">{type}</p>
      <div className="scrollbar relative max-h-[35vh] max-w-lg overflow-auto">
        {listDocument?.map(item => (
          <RecursiveList key={item.id} node={item} favorite={item.favorite} />
        ))}
      </div>
    </div>
  );
};

export default DocumentListType;
