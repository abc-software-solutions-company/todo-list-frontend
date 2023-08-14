import React from 'react';

import {useDocumentsStore} from '@/hooks/useDocuments';

import DocumentList from '../list';

const DocumentsFavorite: React.FC = ({}) => {
  const documentState = useDocumentsStore();
  return (
    <>
      <p className="mt-3 px-3 font-bold">Favorite</p>
      <DocumentList items={documentState.documentsFavorite} isShowDelete={false} />
    </>
  );
};

export default DocumentsFavorite;
