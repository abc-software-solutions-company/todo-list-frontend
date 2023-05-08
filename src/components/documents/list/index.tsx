import React, {useEffect, useState} from 'react';

import Document from '@/components/common/document';
import ModalCreateDocument from '@/components/modal/documents/modal-create';
import Icon from '@/core-ui/icon';
import {useDocumentsStore} from '@/hooks/useDocuments';

import style from './style.module.scss';
import DocumentListType from './style-list';
import RecursiveList from './style-list/recursive-list';

interface IProps {
  id: string;
}

const DocumentList: React.FC<IProps> = ({id}) => {
  const [showModalCreate, isShowModalCreate] = useState<boolean>(false);
  const {documents, isFeching, documentsFavorite, getAllDocument, resetDocumentFavorite, resetDocument} =
    useDocumentsStore();

  useEffect(() => {
    resetDocument();
    resetDocumentFavorite();
  }, [id]);

  useEffect(() => {
    getAllDocument(id);
  }, [isFeching]);

  return (
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
      {/* <DocumentListType type="Favorite" listDocument={documentsFavorite} />
       */}
      <div>
        <p className="mt-3 font-bold">Favorite</p>
        <div className="scrollbar relative max-h-[35vh] max-w-lg overflow-auto">
          {documentsFavorite?.map(item => (
            <div key={item.id}>
              {item.children ? (
                <RecursiveList key={item.id} node={item} favorite={item.favorite} />
              ) : (
                <Document showMoreDoc={() => {}} iconDropdown={''} item={item} />
              )}
            </div>
          ))}
        </div>
      </div>
      <DocumentListType type="Pages" listDocument={documents} />
      {showModalCreate && (
        <ModalCreateDocument open={showModalCreate} onClose={() => isShowModalCreate(false)} docChild={false} />
      )}
    </div>
  );
};

export default DocumentList;
