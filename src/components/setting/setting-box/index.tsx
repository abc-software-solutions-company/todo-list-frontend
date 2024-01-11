import React, {FC} from 'react';

interface ISettingBoxProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  description?: string;
}

const SettingBox: FC<ISettingBoxProps> = ({className, title, description, children}) => {
  return (
    <div className={`${className}`}>
      <p className="text-xl font-bold text-gray-900">{title}</p>
      <div className="mt-6 flex gap-3">{children}</div>
      {description && <p className="mt-3 text-sm font-normal text-gray-500">{description}</p>}
    </div>
  );
};

export default SettingBox;
