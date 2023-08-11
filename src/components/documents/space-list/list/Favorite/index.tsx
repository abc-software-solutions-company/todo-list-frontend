import React from 'react';

import {useDocumentsStore} from '@/hooks/useDocuments';

import DocumentList from '..';

const DocumentsFavorite: React.FC = ({}) => {
  const documentState = useDocumentsStore();
  return (
    <div>
      <p className="mt-3 px-3 font-bold">Favorite</p>
      <DocumentList items={documentState.documentsFavorite} isShowDelete={false} />
    </div>
  );
};

export default DocumentsFavorite;
