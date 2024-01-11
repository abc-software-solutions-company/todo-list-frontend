import Button from '@/components/setting/button';
import Link from 'next/link';
import React, {FC} from 'react';

interface IDeleteAccountProps {
  className?: string;
}

const DeleteAccount: FC<IDeleteAccountProps> = ({className}) => {
  return (
    <div>
      <div className={`${className}`}>
        <p className="text-xl font-medium">Delete account</p>
        <p className="text-sm text-gray-500">
          This will immediately delete all of your data including tasks, projects, comments, and more. This can’t be
          undone.{' '}
          <Link href="" className="text-blue-800 underline">
            Learn more.
          </Link>
        </p>
      </div>
      <div className="mt-8">
        <Button title="Delete Account" className="border border-red-600 text-red-600" />
      </div>
    </div>
  );
};

export default DeleteAccount;
