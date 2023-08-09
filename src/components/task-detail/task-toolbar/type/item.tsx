import {FC} from 'react';

import IssueTypeIcon from '@/components/common/issue-type-icon';

interface TypeItemProps {
  text?: string;
  bgColor?: string;
  icon?: string;
  onClick?: () => void;
}

const TypeItem: FC<TypeItemProps> = ({text, bgColor, icon = '', onClick}) => {
  return (
    <div className="flex cursor-pointer space-x-2" onClick={onClick}>
      <IssueTypeIcon icon={icon} bgColor={bgColor} />
      <p className="font-semibold">{text}</p>
    </div>
  );
};

export default TypeItem;
