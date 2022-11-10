import {Button, Menu, MenuItem} from '@mui/material';
import classNames from 'classnames';
import {FC, ReactNode, useState} from 'react';

import style from './style.module.scss';

export interface IToolMenuProps {
  className?: string;
  items: ReactNode[];
  icon: ReactNode;
  margin?: number;
}

const ToolMenu: FC<IToolMenuProps> = ({className, items, icon, margin}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classNames(style['tool-menu'], className)}>
      <Button
        id="ToolBarMenu-button"
        className={classNames(style['menu-btn'])}
        aria-controls={open ? 'ToolBarMenu-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{padding: 0, margin: margin || 0, minWidth: 24}}
      >
        {icon}
      </Button>
      <Menu
        id="ToolBarMenu-menu"
        anchorEl={anchorEl}
        className={classNames(style.menu)}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'ToolBarMenu-button'
        }}
      >
        {items.map((item, idx) => (
          <MenuItem key={idx} onClick={handleClose} sx={{justifyContent: 'end', fontFamily: 'inherit'}}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default ToolMenu;
