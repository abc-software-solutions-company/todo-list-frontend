import {Popover} from '@mui/material';
import {FC, ReactNode, useState} from 'react';

import TypeItem from './item';

interface ITypeProps {
  data: {text: string; icon: string}[];
  title?: string;
  trigger?: ReactNode;
  onSelect?: (value: string) => void;
}

export const Type: FC<ITypeProps> = ({data, title, trigger, onSelect}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (text: string) => {
    onSelect?.(text);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <button onClick={handleClick}>{trigger}</button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        elevation={8}
        sx={{
          '& .MuiPaper-elevation8': {
            width: 1,
            maxWidth: 200
          }
        }}
      >
        <div className="flex w-full max-w-md flex-col space-y-4 p-4">
          {title && <p className="font-semibold">{title}</p>}
          {data.map(({text, icon}, index) => (
            <TypeItem key={index} text={text} icon={icon} onClick={() => handleSelect(text)} />
          ))}
        </div>
      </Popover>
    </>
  );
};

export default Type;
