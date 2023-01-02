import {FC} from 'react';

import Navigation from './navigation';
import TopArea from './top-area';

const TopBarNew: FC = () => {
  return (
    <div className="topbar-new">
      <TopArea />
      <Navigation />
    </div>
  );
};

export default TopBarNew;
