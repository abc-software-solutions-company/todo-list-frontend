import cls from 'classnames';
import React, {useState} from 'react';

import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import {useDocumentsStore} from '@/hooks/useDocuments';
import {ToastContents} from '@/utils/toast-content';

import OptionDocument from '../option-document';

interface IProps {
  className: string;
  iconDropdown?: any;
  name?: string;
  active?: boolean;
  favorite?: boolean;
  showMoreDoc?: () => void;
  showContent?: () => void;
  getDocument: () => void;
  showDelete?: boolean;
}
const Document: React.FC<IProps> = ({
  name,
  iconDropdown,
  active,
  favorite,
  showDelete,
  className,
  getDocument,
  showMoreDoc,
  showContent
}) => {
  const {error, document, updateDocument} = useDocumentsStore();
  const toast = useToast();
  const {id, content} = document;
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className={cls('relative min-w-[10rem]', className)}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div
        className={cls(
          active ? 'bg-slate-100' : ' hover:bg-slate-100',
          'my-1 flex cursor-pointer justify-between py-3 px-6'
        )}
        onClick={getDocument}
      >
        <div className="flex" onClick={showContent}>
          <Icon name="drop" className={iconDropdown} onClick={showMoreDoc} />
          <p className="max-h-[25px] overflow-hidden">📗 {name}</p>
        </div>
        {isShown && (
          <OptionDocument
            showDelete={showDelete}
            textFavorite={favorite ? 'Remove favorite' : 'Add favorite'}
            handleFavorite={() => {
              updateDocument({id, content, favorite: !favorite});
              if (error) {
                toast.show({type: 'danger', title: 'Favorite Error', content: ToastContents.ERROR});
              } else {
                toast.show({type: 'success', title: 'Favorite Success', content: ToastContents.SUCCESS});
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Document;
