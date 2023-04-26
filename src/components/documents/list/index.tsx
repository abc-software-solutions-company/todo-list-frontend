import cls from 'classnames';
import router from 'next/router';
import React, {useEffect, useState} from 'react';

import Document from '@/components/common/document';
import ModalCreateDocument from '@/components/modal/documents/modal-create';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {IGetDocuments} from '@/data/api/types/documents.type';
import {useDocumentsStore} from '@/hooks/useDocuments';

import useListDocuments from './hook';
import RecursiveList from './recursive-list';
import style from './style.module.scss';

interface IProps {
  id: string;
}

const DocumentList: React.FC<IProps> = ({id}) => {
  const [showPages, setShowPages] = useState<Array<string>>([]);
  const [showModalCreate, isShowModalCreate] = useState<boolean>(false);
  const {toggleShow} = useListDocuments();
  const {
    documents,
    document,
    isFeching,
    documentsFavorite,
    addDocumentsFavorite,
    getAllDocument,
    removeDocumentsFavorite,
    resetDocument,
    getDocument
  } = useDocumentsStore();

  useEffect(() => {
    resetDocument();
  }, [id]);

  useEffect(() => {
    getAllDocument(id);
  }, [isFeching]);

  const renderNode = (node: IGetDocuments, favorite: boolean) => {
    return (
      <div key={node.id}>
        <Document
          favorite={favorite}
          name={node.name}
          showMoreDoc={() => toggleShow(node.id, setShowPages)}
          iconDropdown={
            node.children && (showPages.includes(node.id) ? 'ico-angle-down-small' : 'ico-angle-right-small')
          }
          getDocument={() => {
            getDocument(node.id);
            router.push(`${ROUTES.DOCUMENT}/${id}?id=${node.id}`, undefined, {shallow: true});
          }}
          active={document.id == node.id}
          handleFavorite={() => {
            if (favorite) removeDocumentsFavorite(node.id);
            else addDocumentsFavorite(node);
          }}
        />
        {node.children && (
          <div className={cls(showPages.includes(node.id) ? 'block' : 'hidden', 'ml-6')}>
            {node.children.map(child => renderNode(child, node.favorite))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-fit">
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
        <div className="max-h-[70vh]">
          <div>
            <p className="mt-3 font-bold">Favorite</p>
            <div className="scrollbar relative max-h-[34vh] overflow-x-auto overflow-y-auto">
              {documentsFavorite?.map(item => (
                <RecursiveList key={item.id} document={item} favorite={item.favorite} />
              ))}
            </div>
          </div>
          <div>
            <p className="mt-3 font-bold">Pages</p>
            <div className="scrollbar relative max-h-[34vh] overflow-x-auto overflow-y-auto">
              {documents?.map(item => (
                <RecursiveList key={item.id} document={item} favorite={item.favorite} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModalCreate && (
        <ModalCreateDocument open={showModalCreate} onClose={() => isShowModalCreate(false)} docChild={false} />
      )}
    </div>
  );
};

export default DocumentList;
