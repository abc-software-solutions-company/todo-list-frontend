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
    fontSize: '18px',
    fontWeight: '600', 
    lineHeight: '24px', 
  };

  const statisStyle = {
    fontSize: '30px',
    fontWeight: '600', 
    lineHeight: '28px',
  };

  return (
    <div className={`flex items-center justify-center w-[400px] h-[150px] rounded-[8px] ${bgColor} p-[40px]`}>
      <div className="flex flex-col items-center gap-[2px]">
        <div className="flex items-center gap-[100px] justify-between w-full">
          <h3 style={titleStyle}>{title}</h3>
          <div className="flex items-center justify-center h-[22px] w-[22px] opacity-50">{icon1}</div>
        </div>
        <div className="flex items-center gap-[150px] justify-between w-full mt-[20px]">
          <p style={statisStyle}>{statis}</p>
          <div className="flex items-center gap-[2px]">
            <p className="text-16 font-roboto leading-20 font-normal ">{percent}%</p>
            <div className="opacity-50">{icon2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaticsBox;


