import React, {FC} from 'react';

import DocumentContent from './content';
import DocumentList from './list';

interface IDocumentsProps {
  id: string;
}
const Documents: FC<IDocumentsProps> = ({id}) => {
  return (
    <div className="mt-4 flex max-h-screen gap-6">
      <DocumentList id={id} />
      <DocumentContent />
    </div>
  );
};

export default Documents;
