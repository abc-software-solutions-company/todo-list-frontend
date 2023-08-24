import classNames from 'classnames';
import React, {FC} from 'react';

import IconButton from '../icon-button';
import {ICoreUIBaseProps} from '../types';

interface ICloseProps extends ICoreUIBaseProps {
  className?: string;
  onClick?: () => void;
}

const Close: FC<ICloseProps> = ({className, visible = true, onClick}) => {
  if (!visible) return null;
  return (
    <button className={classNames('abc-close', className)} onClick={onClick}>
      <IconButton className="abc-modal-close" name="ico-x-circle" size={28} />
    </button>
  );
};

Close.displayName = 'ABCClose';

export default Close;
