import {useEffect} from 'react';

import useToast from '@/core-ui/toast';
import {useDocumentsStore} from '@/hooks/useDocuments';
import {ToastContents} from '@/utils/toast-content';

export function useDocumentsMessages() {
  const documentsState = useDocumentsStore();
  const toast = useToast();

  useEffect(() => {
    if (documentsState.isCreating == false && documentsState.error)
      toast.show({type: 'danger', title: 'Create Document Error', content: ToastContents.ERROR});
    if (documentsState.isCreating === false && !documentsState.error)
      toast.show({type: 'success', title: 'Create Document Success', content: ToastContents.SUCCESS});
  }, [documentsState.isCreating]);

  useEffect(() => {
    if (documentsState.isDeleting == false && documentsState.error)
      toast.show({type: 'danger', title: 'Delete Error', content: ToastContents.ERROR});
    if (documentsState.isDeleting === false && !documentsState.error)
      toast.show({type: 'success', title: 'Delete Success', content: ToastContents.SUCCESS});
  }, [documentsState.isDeleting]);

  useEffect(() => {
    if (documentsState.isUpdating === false && documentsState.error)
      toast.show({type: 'danger', title: 'Update Error', content: ToastContents.ERROR});
    if (documentsState.isUpdating === false && !documentsState.error)
      toast.show({type: 'success', title: 'Update Success', content: ToastContents.SUCCESS});
  }, [documentsState.isUpdating]);
}
