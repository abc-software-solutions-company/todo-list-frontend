import React, {CSSProperties, FC} from 'react';

interface ISettingProps {
  className?: string | undefined;
}

const Setting: FC<ISettingProps> = ({className}) => {
  return (
    <div className={className}>
      <p>...</p>
    </div>
  );
};

export default Setting;
