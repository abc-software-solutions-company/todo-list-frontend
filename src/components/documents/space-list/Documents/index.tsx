import classNames from 'classnames';
import React from 'react';

import {IDocumentAttribute} from '@/data/api/types/documents.type';
import {IBaseProps} from '@/types';

import DocumentList from '../list';

interface IDocumentsPageProps extends IBaseProps {
  text: string;
  isShowDelete?: boolean;
  items: IDocumentAttribute[];
}

const Documents: React.FC<IDocumentsPageProps> = ({className, text, isShowDelete = false, items}) => {
  return (
    <div className={classNames('comp-documents', className)}>
      <p className="my-3 px-3 font-bold">{text}</p>
      <DocumentList items={items} isShowDelete={isShowDelete} />
    </div>
  );
};

export default Documents;
