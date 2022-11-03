import {useEffect, useState} from 'react';

import useToast from '@/core-ui/toast';

import {IProps} from '.';

export default function useModalShare({data}: IProps) {
  const {id} = data;
  const toast = useToast();
  const [link, setLink] = useState<string>('');
  const role = (data as any).todolistId ? 'task' : 'list';

  const copy = (text: string, title: string) => {
    toast.show({type: 'success', title: title, content: 'Successful!'});
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (role === 'list') setLink(window.location.origin + `/list/${id}`);
    else setLink(window.location.origin + `/tasks/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {id, copy, role, link};
}
