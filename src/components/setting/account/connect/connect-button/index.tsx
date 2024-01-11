import React, {FC} from 'react';

interface IConnectButtonProps {
  className?: string;
  title: string;
  img: string;
}

const ConnectButton: FC<IConnectButtonProps> = ({className, title, img}) => {
  return (
    <div className={`${className}`}>
      <div className="flex h-16 items-center justify-center gap-2 rounded-lg bg-gray-400 px-48 py-4">
        <div className="">
          <img src={`${img}`} alt="" />
        </div>
        <div className="text-lg font-semibold leading-normal text-gray-300">{title}</div>
      </div>
    </div>
  );
};

export default ConnectButton;
