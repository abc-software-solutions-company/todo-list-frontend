import Icon from '@/core-ui/icon';
import React, {CSSProperties, FC} from 'react';
import Link from 'next/link';

interface ISidebarProjectItemProps {
  className?: string;
  id: string;
  name: string;
}

const SidebarProjectItem: FC<ISidebarProjectItemProps> = ({className, id, name}) => {
  return (
    <Link href={'/projects/' + id} style={{textDecoration: 'none'}}>
      <div className="flex w-full items-center gap-[0.125rem]">
        <Icon name="list-ellipse" className="ico-list-ellipse" />
        <div className="flex items-center justify-between py-4 px-1" style={{flex: '1 0 0'}}>
          <p className="text-lg font-semibold leading-6 text-[#374151]">{name}</p>
          <Icon name="more-horizontal" className="ico-more-horizontal" />
        </div>
      </div>
    </Link>
  );
};

export default SidebarProjectItem;
