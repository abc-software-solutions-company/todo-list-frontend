import Icon from '@/core-ui/icon';
import React, {FC} from 'react';

interface ISettingButtonProps {
  className?: string;
  title: string;
  ico: string;
  id: string;
  activeId: string;
  setSettingView: () => void;
}

const SettingButton: FC<ISettingButtonProps> = ({className, title, ico, id, activeId, setSettingView}) => {
  return (
    <div
      className={`${className} flex cursor-pointer items-center justify-center px-3 py-4 ${
        id === activeId ? 'border-b border-gray-900' : ''
      }`}
      onClick={setSettingView}
    >
      <Icon name={ico} className={`ico-${ico} font-semibold`} />
      <p className="ml-1 font-semibold">{title}</p>
    </div>
  );
};

export default SettingButton;
