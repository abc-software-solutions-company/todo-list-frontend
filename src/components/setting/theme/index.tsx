import Button from '@/components/setting/button';
import SettingBox from '@/components/setting/setting-box';
import SettingItem from '@/components/setting/setting-item';
import ThemeSettingItem from '@/components/setting/theme/theme-setting-item';
import React, {FC} from 'react';

interface IThemeSettingProps {
  className?: string;
}

const ThemeSetting: FC<IThemeSettingProps> = ({className}) => {
  return (
    <div>
      <SettingBox
        title="Personalize your Todoist with colors to match your style, mood, and personality."
        description="Automatically switch between light and dark themes when your system does."
      >
        <div className="-mt-[2px]">
          <SettingItem text="Sync Theme" />
          <SettingItem className="mt-[22px]" text="Auto Dark Mode" />
        </div>
      </SettingBox>
      <SettingBox className="mt-8 mb-8" title="Your theme">
        <div className="grid grid-cols-3 gap-6">
          <ThemeSettingItem theme="SYSTEM" />
          <ThemeSettingItem theme="LIGHT" />
          <ThemeSettingItem theme="DARK" />
        </div>
      </SettingBox>
      <div className="flex justify-end">
        <Button className="bg-gray-200 px-6 text-lg font-semibold text-gray-500" title="Cancel" />
        <Button className="ml-3 bg-blue-800 px-6 text-lg font-semibold text-neutral-50" title="Update" />
      </div>
    </div>
  );
};

export default ThemeSetting;
