import cls from 'classnames';
import router from 'next/router';
import React, {useEffect, useState} from 'react';

import Document from '@/components/common/document';
import ModalCreateDocument from '@/components/modal/documents/modal-create';
import {ROUTES} from '@/configs/routes.config';
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
        <div>
          <p className="mt-3 font-bold">Favorite</p>
          <div className="scrollbar relative max-h-[33vh] overflow-x-auto overflow-y-auto">
            {documents?.map(item => item.favorite && renderNode(item, item.favorite))}
          </div>
        </div>
        <div>
          <p className="mt-3 font-bold">Pages</p>
          <div className="scrollbar relative max-h-[33vh] overflow-x-auto overflow-y-auto">
            {documents?.map(item => renderNode(item, item.favorite))}
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
