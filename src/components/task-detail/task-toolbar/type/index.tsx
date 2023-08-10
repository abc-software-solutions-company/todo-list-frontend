import {Popover} from '@mui/material';
import Image from 'next/image';
import {FC, useState} from 'react';

import Button from '@/core-ui/button';

import TypeItem from './item';

interface ITypeProps {
  data: {text: string; icon: string}[];
  selected?: {text: string; icon: string};
  onSelect?: (value: string) => void;
}

export const Type: FC<ITypeProps> = ({data, selected, onSelect}) => {
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
    <div>
      <Button className="rounded bg-slate-100 p-1 px-2 text-h7" onClick={handleClick}>
        <Image src={`/icons/${selected?.icon}`} alt={selected?.text} width={24} height={24} />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <div className="flex flex-col space-y-4 p-4">
          <p className="font-semibold">CHANGE ISSUE TYPE</p>
          {data.map(({text, icon}, index) => (
            <TypeItem key={index} text={text} icon={icon} onClick={() => handleSelect(text)} />
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default Type;
