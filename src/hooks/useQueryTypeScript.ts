import {useRouter} from 'next/router';

export default function useQueryTypeScript() {
  const router = useRouter();
  const {id} = router.query;
  return id?.toString() || 'no id on url';
}
