import AccountButton from '@/components/setting/account/account-button';
import ConnectedAccount from '@/components/setting/account/connect';
import DeleteAccount from '@/components/setting/account/delete-account';
import PhotoSetting from '@/components/setting/account/photo';
import UpdateProfileSetting from '@/components/setting/account/update';
import React, {FC} from 'react';

interface IAccountSettingProps {
  className?: string;
}

const AccountSetting: FC<IAccountSettingProps> = ({className}) => {
  return (
    <div className="flex w-full flex-col gap-10">
      <PhotoSetting />
      <UpdateProfileSetting />
      <ConnectedAccount />
      <DeleteAccount />
    </div>
  );
};

export default AccountSetting;
