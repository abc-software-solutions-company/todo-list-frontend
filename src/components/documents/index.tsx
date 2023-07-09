import React, {FC} from 'react';

import DocumentContent from './content';
import DocumentList from './list';

interface IDocumentsProps {
  id: string;
}
const Documents: FC<IDocumentsProps> = ({}) => {
  return (
    <div className="mt-4 flex gap-6">
      <DocumentList />
      <DocumentContent />
    </div>
  );
};

export default Documents;
