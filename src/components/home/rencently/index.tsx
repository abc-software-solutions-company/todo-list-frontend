import React, {CSSProperties, FC} from 'react';

interface IRenctlyViewProps {
  className?: string | undefined;
}

const RenctlyView: FC<IRenctlyViewProps> = ({className}) => {
  return (
    <div className={className}>
      <p>...</p>
    </div>
  );
};

export default RenctlyView;
