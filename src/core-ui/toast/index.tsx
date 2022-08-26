import {useLayoutEffect, useRef} from 'react';

import Toast, {IToast, IToastItem} from './toast';

const useToast = () => {
  const toastRef = useRef<IToast>();

  const show = ({type, title, content, icon, lifeTime = 3000}: IToastItem) => {
    toastRef.current?.show({type, title, content, icon, lifeTime});
  };

  useLayoutEffect(() => {
    toastRef.current = Toast.getInstance();
  }, []);

  return {show};
};

export default useToast;
