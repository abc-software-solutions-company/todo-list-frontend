import cls from 'classnames';
import React, {useState} from 'react';

import Document from '@/components/common/document';
import {IGetDocuments} from '@/data/api/types/documents.type';

import useListDocuments from './hook';

interface IRecursiveListProps {
  document: IGetDocuments;
  favorite: boolean;
}
const RecursiveList: React.FC<IRecursiveListProps> = ({document, favorite}) => {
  const [showPages, setShowPages] = useState<Array<string>>([]);
  const {toggleShow} = useListDocuments();

  return (
    <div key={document.id}>
      <Document
        favorite={favorite}
        name={document.name}
        showMoreDoc={() => toggleShow(document.id, setShowPages)}
        iconDropdown={
          document.children && (showPages.includes(document.id) ? 'ico-angle-down-small' : 'ico-angle-right-small')
        }
        getDocument={() => {}}
        active={document.id == document.id}
        handleFavorite={() => {}}
      />
      {document.children && (
        <div className={cls(showPages.includes(document.id) ? 'block' : 'hidden', 'ml-6')}>
          {document.children.map(child => (
            <RecursiveList document={child} key={child.id} favorite={favorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveList;
