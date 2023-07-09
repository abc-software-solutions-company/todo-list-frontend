import cls from 'classnames';
import React from 'react';

import {IDocumentAttribute} from '@/data/api/types/documents.type';
import {useDocumentsStore} from '@/states/useDocuments';

interface IProps {
  item: IDocumentAttribute;
}
const Document: React.FC<IProps> = ({item}) => {
  const {currentDocument, getDocument} = useDocumentsStore();

  return (
    <div className="relative min-w-[10rem]">
      <div
        className={cls(
          currentDocument.id === item.id ? 'bg-slate-100' : ' hover:bg-slate-100',
          'my-1 flex cursor-pointer justify-between py-3 px-6'
        )}
        onClick={() => {
          getDocument(item.id);
        }}
      >
        <div className="flex">
          {/* <Icon name="drop" className={iconDropdown} onClick={showMoreDoc} /> */}
          <p className="max-h-[25px] overflow-hidden">📗 {item.name}</p>
        </div>
        {/* {isShown && (
          <OptionDocument
            textFavorite={favorite ? 'Remove favorite' : 'Add favorite'}
            handleFavorite={() => {
              updateDocument({...currentDocument, favorite: !favorite});
              if (error) {
                toast.show({type: 'danger', title: 'Favorite Error', content: ToastContents.ERROR});
              } else {
                toast.show({type: 'success', title: 'Favorite Success', content: ToastContents.SUCCESS});
              }
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export default Document;
