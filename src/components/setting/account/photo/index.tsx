import Button from '@/components/setting/button';
import React, {FC} from 'react';

interface IPhotoSettingProps {
  className?: string;
}

const PhotoSetting: FC<IPhotoSettingProps> = ({className}) => {
  return (
    <div className={`${className}`}>
      <p className="mb-3 text-xl font-bold text-black">Photo</p>
      <div className="flex">
        <img src="https://via.placeholder.com/120x120" alt="" className="h-28 w-28 rounded-full" />
        <div>
          <div className="ml-6 mt-5 flex">
            <Button disabled title="Change photo" className="mr-3 rounded-xl text-gray-500" />
            <Button title="Remove photo" className="items-center justify-center rounded-xl border border-blue-800" />
          </div>
          <p className="ml-6 mt-2 text-sm text-gray-500">Pick a photo up to 4MB. Your avatar photo will be public</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoSetting;
