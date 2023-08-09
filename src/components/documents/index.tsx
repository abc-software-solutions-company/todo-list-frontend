import React, {FC} from 'react';

import DocumentContent from './content';
import SpaceList from './space-list';

interface IDocumentsProps {
  id: string;
}
const Documents: FC<IDocumentsProps> = ({id}) => {
  return (
    <div className="mt-4 flex gap-6">
      <SpaceList id={id} />
      <DocumentContent />
    </div>
  );
};

export default Documents;
