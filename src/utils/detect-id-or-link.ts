import {ROUTES} from '@/configs/routes.config';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (idOrLink: string) {
  let id;
  if (!idOrLink.includes(window.location.origin + ROUTES.TODO_LIST)) {
    id = idOrLink;
  } else {
    const arr = idOrLink.split(window.location.origin + ROUTES.TODO_LIST);
    id = arr[arr.length - 1];
  }
  return id.toLowerCase().replace('/', '');
}
