import React, {FC} from 'react';

import DocumentContent from './content';
import DocumentList from './list';

interface IProps {
  id: string;
}
const Documents: FC<IProps> = ({id}) => {
  return (
    <div className="flex">
      <DocumentList id={id} />
      <DocumentContent />
    </div>
  );
};

export default Documents;
