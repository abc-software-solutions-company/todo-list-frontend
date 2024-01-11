import ConnectButton from '@/components/setting/account/connect/connect-button';
import React, {FC} from 'react';

interface IConnectedAccountProps {
  className?: string;
}

const ConnectedAccount: FC<IConnectedAccountProps> = ({className}) => {
  return (
    <div className={`${className} `}>
      <div className="mb-8">
        <p className="text-gray-950 text-xl font-medium">Connected Accounts</p>
        <p className="mb-3 text-sm text-gray-500">Login into Todolist with your Google, Facebook, or Apple account</p>
        <p className="mb-2 text-lg text-gray-500">
          You can log in to ToDolist with your Google account{' '}
          <span className="text-lg text-gray-900">chinhcao62@gmail.com</span>
        </p>
        <p className="text-lg text-gray-500">
          Your password is not set, so we cannot disconnect you from your Google account. If you want to dissconnect,
          please <span className="text-red-600">set up your password</span> first
        </p>
      </div>
      <div className="flex gap-[34px]">
        <ConnectButton title="Log in with FaceBook" img="/icons/facebook.png" />
        <ConnectButton title="Log in with Google" img="/icons/google.png" />
      </div>
    </div>
  );
};

export default ConnectedAccount;
