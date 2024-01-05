import {FC} from 'react';
import Input from '@/core-ui/input';
import Icon from '@/core-ui/icon';
import Button from '@/core-ui/button';
import Image from 'next/image';
import useModals from '@/states/modals/use-modals';

const TopBarRightIntern: FC = () => {
  const {setIsOpenModal, setSelectedTodolist} = useModals();

  const onNew = () => {
    setIsOpenModal('testModal');
    setSelectedTodolist();
  };

  const onSearch = () => {
    setIsOpenModal('searchModal');
  };

  return (
    <div className="flex items-center justify-end gap-6">
      <div className="relative">
        <Input
          type="search"
          placeholder="search..."
          className="position w-[335px] gap-2 rounded-lg bg-gray-200 py-3 px-4 pl-10"
          onFocus={onSearch}
        />
        <Icon
          name="ico-search"
          className="ps-3 pointer-events-none absolute inset-y-0 left-2 flex items-center"
        />
      </div>

      <Button className="flex items-center justify-center gap-2 rounded-lg border border-blue-700 py-4 px-3">
        <Icon name="ico-plus-circle" />
        <span onClick={onNew} className="text-lg leading-6">
          Add task
        </span>
      </Button>

      <Image
        src={'/'}
        width={64}
        height={64}
        className="rounded-[64px] border-0 border-gray-400 bg-black"
        alt="avatar"
      />
    </div>
  );
};

export default TopBarRightIntern;
