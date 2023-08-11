import cls from 'classnames';
import React, {useState} from 'react';

import Icon from '@/core-ui/icon';
import {IDocumentAttribute} from '@/data/api/types/documents.type';
import {useDocumentsStore} from '@/hooks/useDocuments';
import {IBaseProps} from '@/types';

import OptionDocument from '../option-document';

interface IProps extends IBaseProps {
  item: IDocumentAttribute;
  showDelete?: boolean;
  isShowChildren: boolean;
  onShowChildren?: () => void;
}
const Document: React.FC<IProps> = ({item, isShowChildren, showDelete = true, onShowChildren}) => {
  const documentsState = useDocumentsStore();
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className="relative min-w-[10rem]"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div
        className={cls(
          item.id === documentsState.currentDocument?.id ? 'bg-slate-100' : ' hover:bg-slate-100',
          'my-1 flex cursor-pointer justify-between py-3 px-6'
        )}
        onClick={() => {
          documentsState.getDocument(item.id);
        }}
      >
        <div className="flex">
          <Icon
            name={isShowChildren ? 'ico-angle-down-small' : 'ico-angle-up-small'}
            className={!item.children ? 'hidden' : ''}
            onClick={onShowChildren}
          />
          <p className="max-h-[25px] overflow-hidden">📗 {item.name}</p>
        </div>
        {isShown && (
          <OptionDocument
            showDelete={showDelete}
            textFavorite={item.favorite ? 'Remove favorite' : 'Add favorite'}
            handleFavorite={() => {
              if (item.favorite) documentsState.addFavoriteDocument(item.id);
              else documentsState.removeFavoriteDocument(item.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Document;
