import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import ModalCreateDocument from '@/components/modal/documents/modal-create';
import Icon from '@/core-ui/icon';
import {useDocumentsStore} from '@/hooks/useDocuments';
import useTodolist from '@/states/todolist/use-todolist';

import DocumentsPage from './Documents';
import DocumentsFavorite from './Favorite';
import style from './style.module.scss';

const ListSpace: React.FC = ({}) => {
  const router = useRouter();
  const {id} = router.query;
  const todolistState = useTodolist();
  const documentState = useDocumentsStore();
  const [showModalCreate, isShowModalCreate] = useState(false);

  useEffect(() => {
    documentState.initState();
    todolistState.getTodolist(id as string);
    documentState.getDocuments(id as string);
    documentState.getDocumentsFavorite(id as string);
  }, [id]);

  useEffect(() => {
    documentState.getDocuments(id as string);
    documentState.getDocumentsFavorite(id as string);
  }, [documentState.isCreating, documentState.isUpdating, documentState.isDeleting]);

  return (
    <>
      <div className={style['document-list']}>
        <div className="flex justify-between px-3 py-3">
          <h4 className="font-bold">Documents</h4>
          <Icon
            name="add"
            className="ico-plus-circle cursor-pointer text-sky-500"
            onClick={() => isShowModalCreate(true)}
          />
        </div>
        <hr />
        <div className="scrollbar max-h-full overflow-y-auto">
          <DocumentsFavorite />
          <DocumentsPage />
        </div>
      </div>
      <ModalCreateDocument open={showModalCreate} onClose={() => isShowModalCreate(false)} docChild={false} />
    </>
  );
};

export default ListSpace;
