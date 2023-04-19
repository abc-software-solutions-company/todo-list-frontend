import cls from 'classnames';
import React from 'react';

import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import {useDocumentsStore} from '@/hooks/useDocuments';
import {ToastContents} from '@/utils/toast-content';

import OptionDocument from '../option-document';

interface IProps {
  iconDropdown?: any;
  name?: string;
  active?: boolean;
  showMoreDoc?: () => void;
  showContent?: () => void;
  getDocument: () => void;
}
const Document: React.FC<IProps> = ({name, iconDropdown, active, getDocument, showMoreDoc, showContent}) => {
  const {error, document, updateDocument} = useDocumentsStore();
  const toast = useToast();
  const {id, content} = document;
  return (
    <div className="relative">
      <div
        className={cls(
          active ? '-mx-3 bg-slate-100 px-3' : 'hover:rounded-md hover:bg-slate-100',
          'flex cursor-pointer justify-between py-3'
        )}
        onClick={getDocument}
      >
        <div className="flex w-full" onClick={showContent}>
          <Icon name="drop" className={iconDropdown} onClick={showMoreDoc} />
          <p className="max-h-[25px] overflow-hidden">📗 {name}</p>
        </div>
        <OptionDocument
          onAddFavorite={() => {
            updateDocument({id, content, favorite: true});
            if (error) {
              toast.show({type: 'danger', title: 'Delete Error', content: ToastContents.ERROR});
            } else {
              toast.show({type: 'success', title: 'Delete Success', content: ToastContents.SUCCESS});
            }
          }}
        />
      </div>
    </div>
  );
};

export default Document;
