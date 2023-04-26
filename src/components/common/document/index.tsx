import cls from 'classnames';
import React, {useState} from 'react';

import useListDocuments from '@/components/documents/list/hook';
import Icon from '@/core-ui/icon';
import {IGetDocuments} from '@/data/api/types/documents.type';
import {useDocumentsStore} from '@/hooks/useDocuments';

import OptionDocument from '../option-document';

interface IProps {
  iconDropdown?: string;
  item: IGetDocuments;
  showMoreDoc?: () => void;
  showContent?: () => void;
}
const Document: React.FC<IProps> = ({iconDropdown, item, showMoreDoc, showContent}) => {
  const [isShown, setIsShown] = useState(false);
  const {document} = useDocumentsStore();
  const {handleGetDocument, handleFavorite} = useListDocuments();

  return (
    <div
      className="relative min-w-[10rem]"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div
        className={cls(
          item.id == document.id ? '-mx-3 bg-slate-100 px-3' : 'hover:rounded-md hover:bg-slate-100',
          'flex cursor-pointer justify-between py-3'
        )}
        onClick={() => handleGetDocument(item.id)}
      >
        <div className="flex" onClick={showContent}>
          <Icon name="drop" className={iconDropdown} onClick={showMoreDoc} />
          <p className="max-h-[25px] overflow-hidden">📗 {item.name}</p>
        </div>
        {isShown && (
          <OptionDocument
            textFavorite={item.favorite ? 'Remove favorite' : 'Add favorite'}
            handleFavorite={() => handleFavorite(item)}
          />
        )}
      </div>
    </div>
  );
};

export default Document;
