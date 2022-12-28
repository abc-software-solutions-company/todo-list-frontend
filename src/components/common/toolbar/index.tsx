import {FC} from 'react';

import ToolBarLeft from './toolbar-left';
import ToolBarRight from './toolbar-right';

const ToolBar: FC = () => {
  return (
    <div className="toolbar-container mt-5 flex h-[50px] justify-between rounded-lg border border-[#E2E8F0] bg-white p-3 font-medium">
      <ToolBarLeft />
      <ToolBarRight />
    </div>
  );
};

export default ToolBar;
