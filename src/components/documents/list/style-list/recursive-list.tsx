import cls from 'classnames';
import React, {useState} from 'react';

import Document from '@/components/common/document';
import {IGetDocuments} from '@/data/api/types/documents.type';

interface IRecursiveListProps {
  node: IGetDocuments;
  favorite: boolean;
}
const RecursiveList: React.FC<IRecursiveListProps> = ({node, favorite}) => {
  const [showPages, setShowPages] = useState<Array<string>>([]);

  const toggleShow = (i: string, set: React.Dispatch<React.SetStateAction<string[]>>) => {
    set(prevState => {
      if (prevState.includes(i)) return prevState.filter((item: any) => item !== i);
      else return [...prevState, i];
    });
  };

  return (
    <div key={node.id}>
      <Document
        showMoreDoc={() => toggleShow(node.id, setShowPages)}
        iconDropdown={node.children && (showPages.includes(node.id) ? 'ico-angle-down-small' : 'ico-angle-right-small')}
        item={node}
      />
      {node.children && (
        <div className={cls(showPages.includes(node.id) ? 'block' : 'hidden', 'ml-6')}>
          {node.children.map(child => (
            <RecursiveList node={child} key={child.id} favorite={favorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveList;
