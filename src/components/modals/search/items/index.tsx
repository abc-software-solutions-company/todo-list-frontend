import {navigationItems, recentlySearchItems} from '@/constants';
import Link from 'next/link';
import React, {FC} from 'react';

interface ISearchModalItems {
  type: 'recently' | 'navigation';
}

const SearchModalItems: FC<ISearchModalItems> = ({ type }) => {
  return (
    <>
      {type === 'recently' ? (
        <div className="flex flex-col items-start gap-3 self-stretch border-b border-gray-300 pb-3">
          <p className="text-gray-[950] text-h5 leading-6">Recently viewed</p>
          <div className="flex flex-col items-start gap-2">
            {recentlySearchItems.map(item => (
              <Link key={item.title} href={item.href} className={'link'}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3 self-stretch pb-3">
          <p className="text-gray-[950] text-h5 leading-6">Navigation</p>
          <div className="flex flex-col items-start gap-2">
            {navigationItems.map(item => (
              <Link key={item.title} href={item.href} className={'link'}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModalItems;
