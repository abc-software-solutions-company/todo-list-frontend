import Button from '@/components/setting/button';
import SettingBox from '@/components/setting/setting-box';
import SettingItem from '@/components/setting/setting-item';
import React, {FC} from 'react';

interface IAdvancedSettingProps {
  className?: string;
}

const AdvancedSetting: FC<IAdvancedSettingProps> = ({className}) => {
  return (
    <div className={`${className}`}>
      <SettingBox
        title="Auto accept project invites"
        description="Automatically accept project invites from known collborators"
      >
        <SettingItem text="On"></SettingItem>
      </SettingBox>
      <SettingBox
        className="mt-[22px]"
        title="Experimental features"
        description="Preview early versions of new features before anyone else"
      >
        <SettingItem text="On"></SettingItem>
      </SettingBox>
      <SettingBox className="mt-9" title="Sound & appearance">
        <Button className="border border-blue-800 py-4 px-8 text-lg font-semibold text-blue-800" title="Reload" />
      </SettingBox>
    </div>
  );
};

export default AdvancedSetting;
