import React, {CSSProperties, FC} from 'react';

import Dashboard from '@/components/home/daskboard';
import Today from '@/components/home/today';
import Project from '@/components/project';

interface IHomeProps {
  className?: string | undefined;
}

const Home: FC<IHomeProps> = ({className}) => {
  return (
    <div className={`${className} flex w-full flex-col items-start`}>
      <Dashboard className="mb-16" />
      <Today className="mb-12" />
      <Project className="mb-12" />
    </div>
  );
};

export default Home;
