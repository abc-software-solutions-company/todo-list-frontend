import {ROUTES} from '@/configs/routes.config';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (idOrLink: string) {
  let id;
  const detectStr = window.location.origin + ROUTES.LIST_DETAIL + '/';
  if (!idOrLink.includes(detectStr)) {
    id = idOrLink;
  } else {
    const arr = idOrLink.split(detectStr);
    id = arr[arr.length - 1];
  }

  return id.toLowerCase();
}
