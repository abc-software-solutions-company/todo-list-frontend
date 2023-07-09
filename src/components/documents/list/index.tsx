import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import Document from '@/components/common/document';
import ModalCreateDocument from '@/components/modal/documents/modal-create';
import Icon from '@/core-ui/icon';
import {IGetDocuments} from '@/data/api/types/documents.type';
import useTodolist from '@/states/todolist/use-todolist';
import {useDocumentsStore} from '@/states/useDocuments';

import style from './style.module.scss';

const DocumentList: React.FC = ({}) => {
  const [showModalCreate, isShowModalCreate] = useState(false);
  const {documents, getAllDocument} = useDocumentsStore();
  const todolistState = useTodolist();
  const router = useRouter();

  useEffect(() => {
    getAllDocument(String(router.query.id));
    todolistState.getTodolist(String(router.query.id));
  }, []);

  // function toggleShow(i: string, set: React.Dispatch<React.SetStateAction<string[]>>) {
  //   set(prevState => {
  //     if (prevState.includes(i)) return prevState.filter((item: any) => item !== i);
  //     else return [...prevState, i];
  //   });
  // }

  const renderNode = (node: IGetDocuments) => {
    return (
      <div key={node.id}>
        <Document item={node} />
        {node.children && <div className="ml-6">{node.children.map(child => renderNode(child))}</div>}
      </div>
    );
  };

  return (
    <div className="sticky top-0 h-fit">
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
          <div>
            <p className="mt-3 px-3 font-bold">Favorite</p>
            <div>{documents?.map(item => item.favorite && renderNode(item))}</div>
          </div>
          <div>
            <p className="mt-3 px-3 font-bold">Pages</p>
            <div>{documents?.map(item => renderNode(item))}</div>
          </div>
        </div>
      </div>
      <ModalCreateDocument open={showModalCreate} onClose={() => isShowModalCreate(false)} docChild={false} />
    </div>
  );
};

export default DocumentList;
