import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

export default function useModalShare({data}: IProps) {
  const router = useRouter();
  const path = router.asPath;

  const {id} = data;
  const toast = useToast();
  const [link, setLink] = useState<string>('');

  const copy = (text: string, title: string) => {
    toast.show({type: 'success', title: title, content: ToastContents.SUCCESS});
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (isListDetailPage(path, id)) setLink(window.location.origin + `${ROUTES.LIST}/${id}`);
    if (isBoardPage(path, id)) setLink(window.location.origin + `${ROUTES.KANBAN}/${id}`);
  }, [id]);

  return {id, copy, link};
}
