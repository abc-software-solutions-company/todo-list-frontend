import {useDocumentsStore} from '@/hooks/useDocuments';

import {IProps} from '../types-create';

export default function useModalDelete({onClose}: IProps) {
  const documentsState = useDocumentsStore();

  const onClick = () => {
    if (documentsState) {
      documentsState.deleteDoument({
        ...documentsState.currentDocument,
        isActive: false
      });
      onClose();
    }
  };
  return {onClick};
}
