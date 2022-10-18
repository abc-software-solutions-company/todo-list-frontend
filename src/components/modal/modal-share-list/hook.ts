import {useEffect, useState} from 'react';

import useToast from '@/core-ui/toast';

import {IProps} from '.';

export default function useModalShareList({data}: IProps) {
  const {id} = data;
  const toast = useToast();
  const [link, setLink] = useState<string>('');

  const copy = (text: string, title: string) => {
    toast.show({type: 'success', title: title, content: 'Successful!'});
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    setLink(window.location.href + `/list/${id}`);
  }, [id]);

  return {id, copy, link};
}
