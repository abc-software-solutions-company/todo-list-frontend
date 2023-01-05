import {FC} from 'react';

import ToolBarLeft from './toolbar-left';
import ToolBarRight from './toolbar-right';

const ToolBarListDetail: FC = () => {
  return (
    <div className="toolbar-container mt-5 flex min-h-[50px] justify-between gap-x-1 rounded-lg border border-[#E2E8F0] bg-white p-3 font-medium">
      <ToolBarLeft />
      <ToolBarRight />
    </div>
  );
};

export default ToolBarListDetail;
