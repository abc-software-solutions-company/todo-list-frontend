import React, {useEffect, useState} from 'react';

import ModalCreateDocument from '@/components/modal/documents/modal-create';
import Icon from '@/core-ui/icon';
import {useDocumentsStore} from '@/hooks/useDocuments';

import RecursiveList from './recursive-list';
import style from './style.module.scss';

interface IProps {
  id: string;
}

const DocumentList: React.FC<IProps> = ({id}) => {
  const [showModalCreate, isShowModalCreate] = useState<boolean>(false);
  const {documents, isFeching, documentsFavorite, getAllDocument, resetDocumentFavorite, resetDocument} =
    useDocumentsStore();

  console.log('🚀 ~ file: index.tsx: documentsFavorite:', documentsFavorite);
  useEffect(() => {
    resetDocument();
    resetDocumentFavorite();
  }, [id]);

  useEffect(() => {
    getAllDocument(id);
  }, [isFeching]);

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
                <RecursiveList key={item.id} node={item} favorite={item.favorite} />
              ))}
            </div>
          </div>
          <div>
            <p className="mt-3 font-bold">Pages</p>
            <div className="scrollbar relative max-h-[34vh] overflow-x-auto overflow-y-auto">
              {documents?.map(item => (
                <RecursiveList key={item.id} node={item} favorite={item.favorite} />
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
