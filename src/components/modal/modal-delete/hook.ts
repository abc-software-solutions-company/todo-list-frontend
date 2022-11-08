import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

import {IProps} from '.';

export default function useModalDelete({onClose, onSuccess, data}: IProps) {
  const router = useRouter();
  const toast = useToast();
  const {id} = data;

  const onClick = () => {
    let req;
    if ((data as any).todolistId)
      req = api.task.update({id, isActive: false}).then(() => {
        toast.show({type: 'success', title: 'Delete ', content: 'Successful!'});
      });
    else
      req = api.list
        .update({id, isActive: false})
        .then(() => {
          toast.show({type: 'success', title: 'Delete list', content: 'Successful!'});
          if (router.asPath.includes(ROUTES.LIST + '/' + id)) {
            router.push(ROUTES.LIST);
          }
        })
        .catch(() => {});
    req
      .then(onSuccess)
      .catch(() =>
        toast.show({
          type: 'danger',
          title: 'Error',
          content: 'An error occurred, please try again'
        })
      )
      .finally(onClose);
  };
  return {onClick};
}
