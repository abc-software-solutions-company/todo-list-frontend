import {IMember} from '@/data/api/types/todolist.type';
import {useStateAuth} from '@/states/auth';
import {JoinerBgColos} from '@/utils/constant';

interface IOptions extends IMember {
  bg: string;
}

export default function useMemberOptions(members: IMember[], memberActiveId?: string) {
  const auth = useStateAuth();
  const options: IOptions[] = [
    {
      bg: 'bg-slate-300',
      id: 'Unassigned',
      name: 'Unassigned'
    }
  ];
  const optionsList: IOptions[] = (members || [])
    ?.map((e, index) => ({bg: JoinerBgColos[index % JoinerBgColos.length], ...e}))
    .sort(a => (a.id == auth?.id ? -1 : 1));

  options?.push(...optionsList);

  const optionActive = memberActiveId ? options.filter(e => e.id == memberActiveId)[0] : undefined;

  return {options, optionActive};
}
