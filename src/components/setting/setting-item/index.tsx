import React, {FC} from 'react';

interface ISettingItemProps {
  className?: string;
  text: string;
}

const SettingItem: FC<ISettingItemProps> = ({className, text}) => {
  return (
    <div className={`${className} flex`}>
      <div className={`flex h-6 w-11 items-center justify-start gap-3`}>
        <div className="flex h-6 w-12 items-center justify-end gap-2 rounded-full bg-green-600 p-0.5">
          <div className="h-5 w-5 rounded-full bg-neutral-50" />
        </div>
      </div>
      <p className="ml-3 text-lg font-semibold text-black">{text}</p>
    </div>
  );
};

export default SettingItem;
