import Image from 'next/image';
import {FC} from 'react';

interface TypeItemProps {
  text?: string;
  icon?: string;
  onClick?: () => void;
}

const TypeItem: FC<TypeItemProps> = ({text, icon = '', onClick}) => {
  return (
    <div className="flex cursor-pointer space-x-2" onClick={onClick}>
      <Image src={`/icons/${icon}`} alt="" width={24} height={24} />
      <p className="font-semibold">{text}</p>
    </div>
  );
};

export default TypeItem;
