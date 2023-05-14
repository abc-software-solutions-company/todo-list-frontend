import router from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {IGetDocuments} from '@/data/api/types/documents.type';
import {useDocumentsStore} from '@/hooks/useDocuments';
import {ToastContents} from '@/utils/toast-content';

const useListDocuments = () => {
  const {document, error, getDocument, updateDocument, removeDocumentsFavorite, addDocumentsFavorite} =
    useDocumentsStore();
  const {show} = useToast();
  const {id} = router.query;

  const checkToast = (errorToast: any, textError: string, textSussces: string) => {
    if (errorToast) {
      show({type: 'danger', title: textError, content: ToastContents.ERROR});
    } else {
      show({type: 'success', title: textSussces, content: ToastContents.SUCCESS});
    }
  };

  const handleGetDocument = (idDoc: string) => {
    getDocument(idDoc);
    router.push(`${ROUTES.DOCUMENT}/${id}?id=${idDoc}`, undefined, {shallow: true});
  };

  const handleFavorite = (node: IGetDocuments) => {
    updateDocument({...document, favorite: !node.favorite});
    checkToast(error, 'Add or remove favorite error', 'Add or remove favorite succes');
    if (error) return;
    if (node.favorite) removeDocumentsFavorite(node.id);
    else addDocumentsFavorite(node);
  };

  return {handleGetDocument, handleFavorite};
};

export default useListDocuments;
