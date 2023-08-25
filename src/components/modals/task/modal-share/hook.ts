import {useEffect, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

export default function useModalShare({data}: IProps) {
  const {id} = data;
  const toast = useToast();
  const [link, setLink] = useState<string>('');

  const copy = (text: string, title: string) => {
    toast.show({type: 'success', title: title, content: ToastContents.SUCCESS});
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    setLink(window.location.origin + `${ROUTES.TASK}/${id}`);
  }, [id]);

  return {id, copy, link};
}
