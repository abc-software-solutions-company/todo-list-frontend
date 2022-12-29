import {FC} from 'react';

import useBoards from '@/states/board/use-boards';

const ToolBarLeft: FC = () => {
  const {boardData} = useBoards();
  return (
    <div className="toolbar-left">
      <p>{boardData.name}</p>
    </div>
  );
};

export default ToolBarLeft;
