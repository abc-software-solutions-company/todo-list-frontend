import {FC} from 'react';

const TopBarNew: FC = () => {
  return (
    <div className="topbar-new py-6 font-medium">
      <div className="title-page-and-account">
        <div className="title-page"></div>
        <div className="account"></div>
      </div>
      <div className="menu-bar flex justify-between rounded-lg bg-[#F1F5F9] px-3">
        <div className="menu-bar-left flex gap-x-6 py-3">
          <div className="my-list">
            <p>My Lists</p>
          </div>
          <div className="my-task">
            <p>My Tasks</p>
          </div>
        </div>
        <div className="menu-bar-right flex items-center">
          <div className="search-box">
            <input placeholder="Search" className="h-8 rounded-lg border px-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBarNew;
