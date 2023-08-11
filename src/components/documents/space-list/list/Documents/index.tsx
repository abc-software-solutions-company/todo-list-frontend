import React from 'react';

import {useDocumentsStore} from '@/hooks/useDocuments';

import DocumentList from '..';

const DocumentsPage: React.FC = ({}) => {
  const documentState = useDocumentsStore();
  return (
    <div>
      <p className="mt-3 px-3 font-bold">Page</p>
      <DocumentList items={documentState.documents} />
    </div>
  );
};

export default DocumentsPage;
