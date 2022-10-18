import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';

import {IProps} from '.';

export default function useModalDelete({setModalOpen, data}: IProps) {
  const router = useRouter();
  const toast = useToast();
  const {id} = data;

  const onClose = () => setModalOpen(false);

  const onClick = () => {
    let req;
    if (!(data as any).todoListId)
      req = api.list.update({id, isActive: false}).then(() => {
        toast.show({type: 'success', title: 'Delete list', content: 'Successful!'});
        if (router.asPath.includes(ROUTES.LIST + '/' + id)) {
          router.push(ROUTES.LIST);
        }
      });
    else {
      req = api.task.update({id, isActive: false}).then(() => {
        toast.show({type: 'success', title: 'Delete task', content: 'Successful!'});
      });
    }
    req
      .catch(() =>
        toast.show({
          type: 'danger',
          title: 'Delete list',
          content: 'Error!, Cannot delete list'
        })
      )
      .finally(() => onClose());
  };
  return {onClick, onClose};
}
