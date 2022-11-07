import MenuIcon from '@mui/icons-material/Menu';
import {Button, Menu, MenuItem} from '@mui/material';
import classNames from 'classnames';
// import {useRouter} from 'next/router';
import {FC, ReactNode, useState} from 'react';

// import {ROUTES} from '@/configs/routes.config';
import style from './style.module.scss';

export interface IToolMenuProps {
  className?: string;
  items: ReactNode[];
}

const ToolMenu: FC<IToolMenuProps> = ({className, items}) => {
  // const router = useRouter();
  // const isDetailPage = router.asPath.split(ROUTES.LIST + '/')[1].length >= 5;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // if (!isDetailPage) return null;

  return (
    <div className={classNames(style['tool-menu'], className)}>
      <Button
        id="ToolBarMenu-button"
        className={classNames(style['menu-btn'])}
        aria-controls={open ? 'ToolBarMenu-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{padding: 0, margin: 0, minWidth: 24}}
      >
        <MenuIcon />
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
