import React, {CSSProperties, FC} from 'react';
import Sidebar from '@/components/sidebar-intern/Sidebar';
import TopBarHoa from '@/components/topbar-hoa';

interface INewLayoutProps extends React.PropsWithChildren<Record<string, unknown>> {
  className?: string | undefined;
  children: React.ReactNode;
}

const NewLayout: FC<INewLayoutProps> = ({className, children}) => {
  return (
    <div className={`${className} flex h-full justify-between bg-[#F8FAFC]`}>
      <Sidebar />
      <main className="ml-[321px] flex flex-col ">
        <TopBarHoa />
        <div className=" py-12 px-6">{children}</div>
      </main>
    </div>
  );
};

export default NewLayout;
