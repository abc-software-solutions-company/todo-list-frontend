import cls from 'classnames';
import React, {useEffect, useState} from 'react';

import Document from '@/components/common/document';
import ModalCreateDocument from '@/components/modal/documents/modal-create';
import Icon from '@/core-ui/icon';
import {IGetDocuments} from '@/data/api/types/documents.type';
import {useDocumentsStore} from '@/hooks/useDocuments';

import style from './style.module.scss';

interface IProps {
  id: string;
}

const DocumentList: React.FC<IProps> = ({id}) => {
  const [showPages, setShowPages] = useState<Array<string>>([]);
  const [showModalCreate, isShowModalCreate] = useState<boolean>(false);
  const {documents, document, isFeching, getAllDocument, getDocument} = useDocumentsStore();

  useEffect(() => {
    getAllDocument(id);
  }, [isFeching]);

  function toggleShow(i: string, set: React.Dispatch<React.SetStateAction<string[]>>) {
    set(prevState => {
      if (prevState.includes(i)) return prevState.filter((item: any) => item !== i);
      else return [...prevState, i];
    });
  }

  const renderNode = (node: IGetDocuments, css: string) => {
    return (
      <div key={node.id}>
        <Document
          content={node.name}
          showMoreDoc={() => toggleShow(node.id, setShowPages)}
          iconDropdown={
            node.children && (showPages.includes(node.id) ? 'ico-angle-down-small' : 'ico-angle-right-small')
          }
          getDocument={() => {
            getDocument(node.id);
          }}
          active={document.id == node.id}
        />
        {node.children && (
          <div className={cls(showPages.includes(node.id) ? 'block' : 'hidden', css)}>
            {node.children.map(child => renderNode(child, 'ml-4'))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={style['document-list']}>
        <div className="mb-3 flex justify-between">
          <h4 className="font-bold">Documents</h4>
          <Icon
            name="add"
            className="ico-plus-circle cursor-pointer text-sky-500"
            onClick={() => isShowModalCreate(true)}
          />
        </div>
        <hr />
        <div>
          <p className="mt-3 font-bold">Pages</p>
          <div className="relative">{documents?.map(item => renderNode(item, 'ml-4'))}</div>
        </div>
      </div>
      {showModalCreate && (
        <ModalCreateDocument open={showModalCreate} onClose={() => isShowModalCreate(false)} docChild={false} />
      )}
    </>
  );
};

export default DocumentList;
