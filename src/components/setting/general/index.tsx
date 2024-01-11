import React, {FC} from 'react';
import Select from '@/components/setting/select';
import SettingBox from '@/components/setting/setting-box';
import SettingItem from '@/components/setting/setting-item';
import Button from '@/components/setting/button';

interface IGeneralSettingProps {
  className?: string;
}

const GeneralSetting: FC<IGeneralSettingProps> = ({className}) => {
  return (
    <div className={`${className} w-full p-3`}>
      <div className="grid grid-cols-2">
        <Select label="Language" options={['Language']}></Select>
        <Select label="Homeview" className="ml-6" options={['Today']}></Select>
      </div>
      <div className="text-xl font-bold text-gray-900">
        <p className="mb-3 mt-6">Data & time</p>
        <div className="mb-8 grid grid-cols-2 gap-6">
          <Select label="Time zone" options={['Timezone']}></Select>
          <Select label="Time Format" className="ml-6" options={['13:00']}></Select>
          <Select label="Date format" options={['DD-MM-YYYY']}></Select>
          <Select label="Week start" className="ml-6" options={['Monday']}></Select>
          <Select label="Next week" options={['Monday']}></Select>
        </div>
      </div>
      <div className="flex">
        <div>
          <SettingBox
            title="Smart date recognition"
            description="Automatically recognize due dates when typing a task."
          >
            <SettingItem text="On" />
          </SettingBox>
          <SettingBox
            className="mt-[22px]"
            title="Reset sub-task"
            description="Reset sub-tasks when you complete a recurring task."
          >
            <SettingItem text="On" />
          </SettingBox>
        </div>
        <div className="ml-[307px]">
          <SettingBox title="Sound & appeareance" description="Play a sound when tasks are completed">
            <div className="flex flex-col gap-3">
              <p className="mb-3 text-lg font-semibold text-gray-900">Task complete one</p>
              <SettingItem text="Desktop and web" />
              <SettingItem text="Mobile" />
            </div>
          </SettingBox>
        </div>
      </div>
      <div className="mt-9 flex justify-end">
        <Button className="bg-gray-200 px-6 text-lg font-semibold text-gray-500" title="Cancel" />
        <Button className="ml-3 bg-blue-800 px-6 text-lg font-semibold text-neutral-50" title="Update" />
      </div>
    </div>
  );
};

export default GeneralSetting;
