import React, {FC} from 'react';

interface ISidebarProjectItemProps {
  className?: string;
}

const SidebarProjectItem: FC<ISidebarProjectItemProps> = ({className}) => {
  return (
    <div className={`${className}`}>
      <p>...</p>
    </div>
  );
};

export default SidebarProjectItem;
