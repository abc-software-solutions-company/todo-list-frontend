import React, { FC, ReactNode } from 'react';

export interface IStaticsBoxProps {
  title: string;
  bgColor?: string;
  percent: string;
  statis: string;
  icon1: ReactNode;
  icon2: ReactNode;
}

const StaticsBox: FC<IStaticsBoxProps> = ({ bgColor, percent, statis, title, icon1, icon2 }) => {
  let firstPart = statis;
  let secondPart = '';

  if (statis.includes('/')) {
    [firstPart, secondPart] = statis.split('/');
  }

  return (
    <div className={`p-10 w-full rounded-md h-full ${bgColor}`}>
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center justify-between w-full">
          <h3 >{title}</h3>
          <div className="flex items-center justify-center opacity-50">{icon1}</div>
        </div>
        <div className="flex items-baseline justify-between w-full">
          <div className='font-bold'>
            <span className='text-[32px]'>{firstPart}</span>
            {secondPart && (
              <span className='text-xl'>/{secondPart}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold ">{percent}%</p>
            <div className="opacity-50">{icon2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticsBox;
