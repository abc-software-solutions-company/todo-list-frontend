import cls from 'classnames';
import React, {useState} from 'react';

import Icon from '@/core-ui/icon';
import {IDocumentAttribute} from '@/data/api/types/documents.type';
import {useDocumentsStore} from '@/states/useDocuments';

import OptionDocument from '../option-document';

interface IProps {
  item: IDocumentAttribute;
}
const Document: React.FC<IProps> = ({item}) => {
  const documentState = useDocumentsStore();
  const [showMoreDoc, setShowMoreDoc] = useState();

  return (
    <div className="relative min-w-[10rem]">
      <div
        className={cls(
          documentState.currentDocument.id === item.id ? 'bg-slate-100' : ' hover:bg-slate-100',
          'my-1 flex cursor-pointer justify-between py-3 px-6'
        )}
        onClick={() => {
          documentState.getDocument(item.id);
        }}
      >
        <div className="flex">
          <Icon
            name="drop"
            className=""
            onClick={() => {
              setShowMoreDoc(!showMoreDoc);
            }}
          />
          <p className="max-h-[25px] overflow-hidden">📗 {item.name}</p>
        </div>
        {/* {isShown && ( */}
        <OptionDocument
          textFavorite={item.favorite ? 'Remove favorite' : 'Add favorite'}
          handleFavorite={() => {
            documentState.updateDocument({...documentState.currentDocument, favorite: !item.favorite});
            // if (error) {
            //   toast.show({type: 'danger', title: 'Favorite Error', content: ToastContents.ERROR});
            // } else {
            //   toast.show({type: 'success', title: 'Favorite Success', content: ToastContents.SUCCESS});
            // }
          }}
        />
        {/* )} */}
      </div>
      {item.children && (
        <div className={cls('ml-6', !showMoreDoc && 'hidden')}>
          {item.children.map(child => (
            <Document item={child} key={child.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Document;
