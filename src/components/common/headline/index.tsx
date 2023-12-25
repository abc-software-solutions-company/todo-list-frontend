import Icon from '@/core-ui/icon';
import {FC, ReactNode} from 'react';

interface IHeadlineProps {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  titleLeft?: string;
  titleRight?: string;
}

const HeadLine: FC<IHeadlineProps> = ({iconLeft, iconRight, titleLeft, titleRight}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-[346px] items-center gap-5">
        {iconLeft && iconLeft}
        {titleLeft && 
            <p className="text-[32px] font-bold leading-9 text-gray-900">
                {titleLeft}
            </p>}
      </div>
      <div className="flex w-[155px] shrink-0 items-center justify-center gap-2 rounded-lg py-4 px-3">
        {iconRight && iconRight}
        {titleRight && <p className="text-lg font-semibold leading-6 text-gray-700">
            {titleRight}
        </p>}
      </div>
    </div>
  );
};

export default HeadLine;
