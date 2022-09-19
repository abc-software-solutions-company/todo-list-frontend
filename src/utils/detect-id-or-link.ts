import {ROUTES} from '@/configs/routes.config';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (idOrLink: string) {
  console.log('🚀 ~ file: detect-id-or-link.ts ~ line 5 ~ idOrLink', idOrLink);
  let id;
  const detectStr = window.location.origin + ROUTES.LIST + '/';
  if (!idOrLink.includes(detectStr)) {
    id = idOrLink;
  } else {
    const arr = idOrLink.split(detectStr);
    id = arr[arr.length - 1];
  }
  console.log(id.toLowerCase());

  return id.toLowerCase();
}
