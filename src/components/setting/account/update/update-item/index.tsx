import Button from '@/components/setting/button';
import React, {FC} from 'react';

interface IUpdateProfileInputProps {
  className?: string;
  label: string;
  buttonLabel: string;
  inputType?: string;
}

const UpdateProfileInput: FC<IUpdateProfileInputProps> = ({className, inputType = 'text', label, buttonLabel}) => {
  return (
    <div className={`${className}`}>
      <p className="text-xl font-medium text-gray-900">{label}</p>
      <div className="mt-2 flex items-center justify-center">
        <input type={`${inputType}`} className="mr-6 w-full rounded-lg border-gray-300 p-4" />
        <Button title={buttonLabel} className="w-40 border border-blue-800 text-blue-800" />
      </div>
    </div>
  );
};

export default UpdateProfileInput;
