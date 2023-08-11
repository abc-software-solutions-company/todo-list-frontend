import React, {FC} from 'react';

import DocumentContent from './content';
import {useDocumentsMessages} from './hook';
import SpaceList from './space-list';

const Documents: FC = () => {
  useDocumentsMessages();
  return (
    <div className="mt-4 flex gap-6">
      <SpaceList />
      <DocumentContent />
    </div>
  );
};

export default Documents;
