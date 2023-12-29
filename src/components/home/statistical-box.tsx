import React, { FC, ReactNode } from 'react';

export interface IStaticsBoxProps {
  title: string;
  bgColor?: string;
  percent: string;
  statis: string;
  icon1: ReactNode;
  icon2: ReactNode;
  className?: string;
}

const StaticsBox: FC<IStaticsBoxProps> = ({ bgColor, percent, statis, title, icon1, icon2 }) => {
  const titleStyle = {
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '24px',
  };

  const statisStyle = {
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '36px',
    display: 'flex',
    alignItems: 'center',
  };

  let firstPart = statis;
  let secondPart = '';

  if (statis.includes('/')) {
    [firstPart, secondPart] = statis.split('/');
  }

  return (
    <div className={`flex items-center justify-center w-[446px] h-[164px] rounded-[8px] ${bgColor} p-[40px]`}>
      <div className="flex flex-col items-center gap-[2px]">
        <div className="flex items-center gap-[100px] justify-between w-full">
          <h3 style={titleStyle}>{title}</h3>
          <div className="flex items-center justify-center h-[22px] w-[22px] opacity-50">{icon1}</div>
        </div>
        <div className="flex items-center gap-[150px] justify-between w-full mt-[20px]">
          <div style={statisStyle}>
            <span style={{ fontSize: '28px' }}>{firstPart}</span>
            {secondPart && (
              <span style={{ fontSize: '16px', margin: '9px 0 0 0 ' }}>/{secondPart}</span>
            )}
          </div>
          <div className="flex items-center gap-[2px]">
            <p className="text-sm font-semibold ">{percent}%</p>
            <div className="opacity-50">{icon2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticsBox;
