import React, {FC, useEffect, useState} from 'react';

import {IDocumentResponse} from '@/data/api/types/document.type';
import useDocuments from '@/states/documents/use-lists';

import DocumentContent from './content';
import DocumentList from './list';

interface IProps {
  id: string;
  documents?: IDocumentResponse[];
}
const Documents: FC<IProps> = ({id}) => {
  console.log('🚀 ~ file: index.tsx:10 ~ id:', id);
  const {myDocuments, favoriteDocuments, getDocumentByList} = useDocuments();
  useEffect(() => {
    getDocumentByList(id);
  }, []);
  return (
    <div className="flex">
      <DocumentList documents={myDocuments} favoriteDocuments={favoriteDocuments} />
      <DocumentContent />
    </div>
  );
};

export default Documents;
