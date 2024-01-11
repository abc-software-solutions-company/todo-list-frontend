import React, {FC} from 'react';
import {string} from 'yup';

interface IThemeSettingItemProps {
  className?: string;
  theme: 'SYSTEM' | 'LIGHT' | 'DARK';
}

const ThemeSettingItem: FC<IThemeSettingItemProps> = ({className, theme}) => {
  let themeItem = {
    background: 'bg-slate-50',
    left: 'bg-blue-800',
    right: 'bg-gray-200',
    bottom: 'bg-gray-400',
    title: 'System'
  };

  switch (theme) {
    case 'SYSTEM':
      break;
    case 'LIGHT':
      themeItem = {
        ...themeItem,
        left: 'bg-gray-200',
        bottom: 'bg-gray-300',
        title: 'Light'
      };
      break;
    case 'DARK':
      themeItem = {
        ...themeItem,
        background: 'bg-gray-900',
        left: 'bg-gray-200',
        bottom: 'bg-gray-200',
        right: 'bg-gray-400',
        title: 'Dark'
      };
      break;
  }

  return (
    <div className={`${className}`}>
      <div
        className={`flex h-52 w-96 items-start justify-start gap-3 rounded-lg ${themeItem.background} border-t border-gray-200 px-3 py-8 shadow`}
      >
        <div className={`h-40 w-14 rounded ${themeItem.left}`} />
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3">
          <div className={`h-11 origin-top-left self-stretch rounded ${themeItem.right}`} />
          <div className={`h-11 origin-top-left self-stretch rounded ${themeItem.right}`} />
          <div className={`relative h-12 origin-top-left self-stretch rounded ${themeItem.right}`}>
            <div className="absolute left-[8.28px] top-[4px] inline-flex h-11 w-44 flex-col items-start justify-start gap-0.5 rounded">
              <div className={`h-3 w-24 rounded-xl ${themeItem.bottom}`} />
              <div className={`h-3 w-40 rounded-xl ${themeItem.bottom}`} />
              <div className={`h-3 w-40 rounded-xl ${themeItem.bottom}`} />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-black">{`${themeItem.title}`}</p>
    </div>
  );
};

export default ThemeSettingItem;
