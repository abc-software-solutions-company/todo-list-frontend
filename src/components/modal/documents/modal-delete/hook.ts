import useToast from '@/core-ui/toast';
import {useDocumentsStore} from '@/states/useDocuments';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '../types-create';

export default function useModalDelete({onClose}: IProps) {
  const toast = useToast();
  const {error, currentDocument, updateDocument} = useDocumentsStore();
  const id = currentDocument.id;
  const content = String(currentDocument.content);
  const name = currentDocument.name;
  const onClick = () => {
    if (document) {
      updateDocument({
        id,
        content,
        isActive: false,
        name
      });
      if (error) {
        toast.show({type: 'danger', title: 'Delete Error', content: ToastContents.ERROR});
      } else {
        toast.show({type: 'success', title: 'Delete Success', content: ToastContents.SUCCESS});
      }
      onClose();
    }
  };
  return {onClick};
}
