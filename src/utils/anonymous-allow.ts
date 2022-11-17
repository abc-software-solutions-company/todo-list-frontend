import {ROUTES} from '@/configs/routes.config';

export const anonymousAllow = (path: string) => {
  switch (path) {
    case '/':
      return null;
    case '/list':
      return null;
    default:
      return !path.includes(ROUTES.LIST || ROUTES.TASK);
  }
};
