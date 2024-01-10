import DatePicker from '@/components/upcoming/date-picker';
import UpcomingBtn from '@/components/upcoming/upcoming-top/button';
import Icon from '@/core-ui/icon';
import Select from '@mui/material/Select';
import {divide} from 'lodash-es';
import React, {CSSProperties, FC} from 'react';

interface IUpcomingTopProps {
  className?: string | undefined;
}

const UpcomingTop: FC<IUpcomingTopProps> = ({className}) => {
  return (
    <div className={`${className} mt-5 flex justify-between`}>
      <DatePicker onChange={() => {}} title="December 22" value={new Date()} className={undefined}></DatePicker>
      <div className="flex gap-3">
        <div className="flex gap-[2px]">
          <UpcomingBtn
            content={<Icon name="angle-left" className="ico-angle-left" size={24}></Icon>}
            className="w-14 rounded-tl-lg rounded-bl-lg"
          />
          <UpcomingBtn
            content={<Icon name="angle-right" className="ico-angle-right" size={24}></Icon>}
            className="w-14 rounded-tr-lg rounded-br-lg"
          />
        </div>
        <UpcomingBtn content={<p>Go to day</p>} className="w-28 rounded-lg" />
        <UpcomingBtn
          className="w-40 rounded-lg"
          content={
            <div className="flex">
              <Icon name="sliders-horizontal" className="ico-sliders-horizontal" />
              <p className="ml-1">View</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default UpcomingTop;
