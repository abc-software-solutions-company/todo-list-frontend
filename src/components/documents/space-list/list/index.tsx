import cls from 'classnames';
import router from 'next/router';
import React, {useEffect, useState} from 'react';

import Document from '@/components/common/document';
import ModalCreateDocument from '@/components/modal/documents/modal-create';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {IDocumentAttribute} from '@/data/api/types/documents.type';
import {useDocumentsStore} from '@/hooks/useDocuments';
import useTodolist from '@/states/todolist/use-todolist';

import style from './style.module.scss';

interface IProps {
  id: string;
}

const SpaceList: React.FC<IProps> = ({id}) => {
  const [showPages, setShowPages] = useState<Array<string>>([]);
  const [showModalCreate, isShowModalCreate] = useState<boolean>(false);
  const documentsState = useDocumentsStore();
  const todolistState = useTodolist();

  useEffect(() => {
    documentsState.resetDocument();
    todolistState.getTodolist(id);
  }, [id]);

  useEffect(() => {
    documentsState.getAllDocument(id);
  }, [documentsState.isFeching]);

  function toggleShow(i: string, set: React.Dispatch<React.SetStateAction<string[]>>) {
    set(prevState => {
      if (prevState.includes(i)) return prevState.filter((item: any) => item !== i);
      else return [...prevState, i];
    });
  }

  const renderNode = (node: IDocumentAttribute, favorite: boolean) => {
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
            documentsState.getDocument(node.id);
            router.push(`${ROUTES.DOCUMENT}/${id}?id=${node.id}`, undefined, {shallow: true});
          }}
          active={documentsState.document.id == node.id}
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
    <>
      {showModalCreate && (
        <ModalCreateDocument open={showModalCreate} onClose={() => isShowModalCreate(false)} docChild={false} />
      )}
    </>
  );
};

export default SpaceList;
