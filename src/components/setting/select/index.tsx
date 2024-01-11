import Button from '@/components/setting/button';
import React, {FC} from 'react';

interface ISelectProps {
  className?: string;
  label: string;
  inputType?: string;
  children?: React.ReactNode;
  options: string[];
}

const Select: FC<ISelectProps> = ({className, inputType = 'text', label, children, options}) => {
  return (
    <div className={`${className}`}>
      <p className="text-xl font-medium text-gray-900">{label}</p>
      <div className="mt-2 flex items-center justify-center">
        <select name="" id="" className='className="mr-6 w-full rounded-lg border-gray-300 p-4'>
          {options.map(option => (
            <option>{option}</option>
          ))}
        </select>
        {children}
      </div>
    </div>
  );
};

export default Select;
