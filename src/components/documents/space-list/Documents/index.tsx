import React from 'react';

import {useDocumentsStore} from '@/hooks/useDocuments';

import DocumentList from '../list';

const DocumentsPage: React.FC = ({}) => {
  const documentState = useDocumentsStore();

  return (
    <>
      <p className="mt-3 px-3 font-bold">Page</p>
      <DocumentList items={documentState.documents} />
    </>
  );
};

export default DocumentsPage;
