import {Popover} from '@mui/material';
import {FC, useState} from 'react';

import IssueTypeIcon from '@/components/common/issue-type-icon';
import Button from '@/core-ui/button';

import TypeItem from './item';

interface ITypeProps {
  data: {text: string; icon: string; bgColor: string}[];
  selected?: {text: string; icon: string; bgColor: string};
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
        <IssueTypeIcon icon={selected?.icon} bgColor={selected?.bgColor} />
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
          {data.map(({text, bgColor, icon}, index) => (
            <TypeItem key={index} text={text} bgColor={bgColor} icon={icon} onClick={() => handleSelect(text)} />
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default Type;
