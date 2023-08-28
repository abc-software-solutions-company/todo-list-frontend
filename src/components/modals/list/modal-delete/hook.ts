import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

export default function useModalDelete({onClose, onSuccess, data}: IProps) {
  const router = useRouter();
  const toast = useToast();
  const {id} = data;

  const onClick = () => {
    let req;
    if (data) {
      req = api.todolist.update({id, isActive: false}).then(() => {
        toast.show({type: 'success', title: 'Delete list', content: ToastContents.SUCCESS});
        if (router.asPath.includes(ROUTES.LIST + '/' + id) || router.asPath.includes(ROUTES.KANBAN + '/' + id)) {
          router.push(ROUTES.LIST);
        }
      });
      req.then(onSuccess).catch(() =>
        toast.show({
          type: 'danger',
          title: 'Error',
          content: ToastContents.ERROR
        })
      );
      onClose();
    }
  };
  return {onClick};
}
