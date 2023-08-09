import cls from 'classnames';
import React from 'react';

import Document from '@/components/common/document';
import {IDocumentAttribute} from '@/data/api/types/documents.type';
import {IBaseProps} from '@/types';

interface ISpaceListProps extends IBaseProps {
  items: IDocumentAttribute[];
}

const SpaceList: React.FC<ISpaceListProps> = ({className, items}) => {
  function toggleShow(i: string, set: React.Dispatch<React.SetStateAction<string[]>>) {
    set(prevState => {
      if (prevState.includes(i)) return prevState.filter((item: any) => item !== i);
      else return [...prevState, i];
    });
  }

  const renderNode = (node: IDocumentAttribute) => {
    return (
      <Document
        showMoreDoc={() => toggleShow(node.id, setShowPages)}
        iconDropdown={node.children && (showPages.includes(node.id) ? 'ico-angle-down-small' : 'ico-angle-right-small')}
      />
    );
  };

  return <div className={cls('comp-document-list', className)}>{items.map(() => ())}</div>;
};

export default SpaceList;
