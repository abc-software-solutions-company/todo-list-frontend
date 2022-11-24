import {IMemberResponse} from '@/data/api/types/todolist.type';
import {IUserResponse} from '@/data/api/types/user.type';
import {useStateAuth} from '@/states/auth';
import {JoinerBgColos} from '@/utils/constant';

interface IOptions extends IUserResponse {
  bg: string;
}

export default function useMemberOptions(members: IMemberResponse[], memberActiveId?: string) {
  const auth = useStateAuth();
  const options: IOptions[] = [
    {
      bg: 'bg-slate-300',
      id: 'Unassigned',
      name: 'Unassigned'
    }
  ];
  const optionsList: IOptions[] = members
    .filter(e => e.isActive)
    .map((e, index) => ({bg: JoinerBgColos[index % JoinerBgColos.length | 0], ...e.user}))
    .sort(a => (a.id == auth?.id ? -1 : 1));

  options.push(...optionsList);

  const optionActive = memberActiveId ? options.filter(e => e.id == memberActiveId)[0] : undefined;

  return {options, optionActive};
}
