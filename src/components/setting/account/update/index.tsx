import UpdateProfileInput from '@/components/setting/account/update/update-item';
import UpdateProfileItem from '@/components/setting/account/update/update-item';
import React, {FC} from 'react';

interface IUpdateProfileSettingProps {
  className?: string;
}

const UpdateProfileSetting: FC<IUpdateProfileSettingProps> = ({className}) => {
  return (
    <div className={`${className} w-full`}>
      <UpdateProfileInput label="Name" className="mb-6" buttonLabel="Change name" />
      <UpdateProfileInput label="Email" className="mb-6" buttonLabel="Change gmail" />
      <UpdateProfileInput inputType="password" label="Password" buttonLabel="Add password" />
    </div>
  );
};

export default UpdateProfileSetting;
